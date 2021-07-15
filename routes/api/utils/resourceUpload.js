const config = require('config')
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { v4: uuidv4 } = require('uuid');

const s3Config = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || config.get('AWSAccessKeyId'),
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || config.get('AWSSecretKey'),
    Bucket: process.env.S3_BUCKET_RESOURCES || config.get('S3ResourcesBucket')
});

const fileFilter = (req, file, callback) => {

    const allowedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.ms-powerpoint', 'application/x-pdf'];

    if (allowedFileTypes.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(null, false);
    }
}

// Uploading images locally if multer is working.
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads/resources');
    },
    filename: (req, file, callback) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        callback(null, uuidv4() + '-' + fileName)
    }
});

// Uploading images to aws
const multerS3Config = multerS3({
    s3: s3Config,
    bucket: process.env.S3_BUCKET_RESOURCES || config.get('S3ResourcesBucket'),
    metadata: (req, file, callback) => {
        callback(null, { fieldName: file.fieldname });
    },
    key: (req, file, callback) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        callback(null, uuidv4() + '-' + fileName)
    }
});

const upload = multer({
    storage: multerS3Config,
    fileFilter: fileFilter,
    limits: {
        fileSize: 25000000 // 1000000 Bytes = 1 MB
    }
})

exports.resourceUpload = upload;