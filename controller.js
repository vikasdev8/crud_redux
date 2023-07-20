const { USERS } = require('./DB')
const ImageKit = require("imagekit");
const imagekit = new ImageKit({
    publicKey: "public_CwZ++GnDXtHbEk7aoJGUHZYT53A=",
    privateKey: "private_pEQqkDbbqJR+ZvEgiN4zA/IBPeY=",
    urlEndpoint: "https://ik.imagekit.io/tv02mvd9i"
})
module.exports = class APIS {
    message = "This is Default message";
    status = 400

    response(res, msg, code = this.status, data=null) {
        return res.status(code).json({
            msg: msg ? msg : this.message,
            data
        })
    }

    register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                return this.response(res, "fill all required field")
            }
            const n = name.toLowerCase();
            const e = email.toLowerCase();
            console.log('check[22]', n, e);
            USERS.create({
                name: n,
                email: e,
                password
            }).then((response) => {
                this.response(res, "user successfully created", 200)
            })
        } catch (error) {
            return this.response(res, error.message)
        }
    }

    async login(req, res, next) {
        try {
            const { user, password } = req.body;
            if (!user || !password) {
                return this.response(res, "Fill all required field")
            }
            const u = user.toLowerCase();
            const __user = await USERS.findOne({
                $or: [
                    { name: u },
                    { email: u }
                ]
            })
            if (!__user) {
                return this.response(res, "enter details is not correct")
            }

            const checking = __user.checkPassword(password, __user.password);

            if (!checking) {
                return this.response(res, "Password is not correct")
            }
            __user.createToken(res, __user)
        } catch (error) {
            return this.response(res, error.message)
        }
    }

    async uploadImage(req, res, next) {
        try {
            const { name } = req.user;

            const Files = req.files;

            if (Files.length === 0) {
                return this.response(res, "Pls choose file")
            }
            const filePromises = Files.map((file) => {
                const ext_tag = file.originalname.split('.')
                return imagekit.upload({
                    folder: `/CRUD/${name}`,
                    fileName: `${new Date(Date.now())}.${ext_tag[1]}`,
                    file: file.buffer,
                    overwriteFile: false,
                    tags: [ext_tag[0]]
                })
            })
            await Promise.all(filePromises);
            this.response(res, "File uploaded successFully", 200)
        } catch (error) {
            return this.response(res, error.message)
        }
    }

    async getFiles(req, res, next) {
        try {
            const { name, email } = req.user;
            const { limit, skip } = req.body;

            const Images = await imagekit.listFiles({
                path: `/CRUD/${name}`,
                limit,
                skip
            })
            console.log('check[104]',Images);
            if (Images.length === 0) {
               return this.response(res, "Folder is Empty", 200)
            }

            this.response(res,"Data Received",200,Images)

        } catch (error) {
            return this.response(res, error.message)
        }
    }

    async deleteFile(req, res, next) {
        try {
            const { id } = req.params;

            const Images = await imagekit.deleteFile(id)

            this.response(res,"File Deleted successFully",200)

        } catch (error) {
            return this.response(res, error.message)
        }
    }
}