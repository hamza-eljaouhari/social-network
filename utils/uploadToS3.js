const { IAM_USER_KEY, IAM_USER_SECRET, BUCKET_NAME}  = require('../aws-iam.js');
const AWS = require('aws-sdk');

module.exports = function uploadToS3(file) {
    let s3bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
        Bucket: BUCKET_NAME
    });

    var params = {
        Bucket: BUCKET_NAME,
        Key: file.name,
        Body: file.content
    };

    s3bucket.upload(params, function (err, data) {
        if (err) {
            console.log('error in callback');
            console.log(err);
        }

        console.log('success');
        console.log(data);
    });
}
