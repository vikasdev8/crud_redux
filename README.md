Before starting this app Pls add config keys into ./controller.js for Imagekit. setup cors in ./index.js a per your local server
# crud_redux
The frontend of Respondary is built using React, a widely embraced JavaScript library known for its component-based architecture, modularity, and reusability. The intuitive user interface of Respondary is crafted using Chakra UI, a sleek and customizable React UI framework. The integration of React Redux further enhances the application's performance, providing seamless state management across the entire app.

To ensure smooth data flow and efficient client-server communication, Respondary employs RTK Query, a powerful data-fetching and state management tool specifically designed for Redux. With RTK Query, the app maintains a centralized data store, reducing the need for excessive network requests and ensuring a more responsive user interface.

Ensuring data integrity and efficient storage, Respondary utilizes Mongoose, an elegant object data modeling (ODM) library that provides a straightforward interface for interacting with MongoDB databases. MongoDB, a NoSQL database, offers flexibility and scalability, making it an ideal choice for cloud-based applications.

To enhance the user experience and provide real-time form validation, Respondary integrates React Hook Form, a performant form validation library for React applications. This allows users to submit data with confidence, knowing that it adheres to the predefined rules and criteria.

One of the standout features of Respondary is its seamless image handling capabilities. The app utilizes ImageKit, a cloud-based image optimization and transformation service. With ImageKit, users can upload their images or files and have them automatically optimized for different devices and resolutions, ensuring faster load times and a better user experience.

For secure file uploads, Respondary employs Multer, a powerful middleware for handling multipart/form-data in Node.js. Multer enables the app to handle file uploads smoothly, ensuring that user data remains safe and secure throughout the process.

In Respondary, users can create an account by registering themselves. Once registered, they gain access to a personalized dashboard, where they can manage their uploaded images or files. Users can upload images from their local storage, and Respondary will automatically save them to the cloud using ImageKit. This feature allows users to access their files from anywhere and on any device, making file management a breeze.

The app also provides a user-friendly interface for image deletion. Users can effortlessly delete images they no longer need, freeing up storage space and maintaining a well-organized collection.
