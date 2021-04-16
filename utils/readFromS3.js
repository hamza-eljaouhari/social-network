const { IAM_USER_KEY, IAM_USER_SECRET, BUCKET_NAME}  = require('../aws-iam.js');
const AWS = require('aws-sdk');

module.exports = function readFromS3(fileName) {
    return new Promise((resolve, reject) => {
        let s3bucket = new AWS.S3({
            accessKeyId: IAM_USER_KEY,
            secretAccessKey: IAM_USER_SECRET,
            Bucket: BUCKET_NAME
        });
        
        s3bucket.getObject({
            Bucket: BUCKET_NAME,
            Key: fileName
        }, function(err, data){
            if (err) reject(err)
            else resolve(data);  
        });
    });
}
