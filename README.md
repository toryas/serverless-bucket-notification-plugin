# Toryas / Serverless Bucket Notification Plugin


This is a very poor readme for this plugin but now I so tired to write the full descriptions... I will update this readme later :)

So this is the essential

## How to use

Install the plugin with `npm i -S serverless-bucket-notification-plugin`

add the plugin in the serverless.yml file config

```yml
plugins:
  - serverless-bucket-notification-plugin # <- like this!
```

Add the configuration in the serverless.yml file to create a notification events in the bucket

```yml

custom:
  BucketNotificationConfig:
    bucket: MyBucket # Required
    notifications: # Required
      - topic:
          name: notificationName # Required 
          arn: sns_arn # Required
          events: # Required
            - s3:ObjectCreated:Put 
            - s3:ObjectCreated:Copy
            - # As much as you want 
          prefix: folder/ # a prefix if you need
          suffix: .txt # a suffix if you need
      - lambda:
          name: notificationName # Required
          arn: lambda_arn # Required
          events: # Required
            - s3:ObjectCreated:Put 
            - s3:ObjectCreated:Copy
            - # As much as you want 
          prefix: folder/ # a prefix if you need
          suffix: .txt # a suffix if you need
      - queue:
          name: notificationName # Required
          arn: queue_arn # Required
          events: # Required
            - s3:ObjectCreated:Put 
            - s3:ObjectCreated:Copy
            - # As much as you want 
          prefix: folder/ # a prefix if you need
          suffix: .txt # a suffix if you need

```
You can add your notifications as you like.

```yml
custom:
  BucketNotificationConfig:
    bucket: MyBucket # Required
    notifications: # Required
      - topic:
            ...
      - topic:
            ...
      - lambda:
            ...
```
 or 

```yml
custom:
  BucketNotificationConfig:
    bucket: MyBucket # Required
    notifications: # Required
      - topic:
            ...
```

Finally the notification configuration add a events in your bucket after stack deploy.

`sls deploy`

```s
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service test.zip file to S3 (8.91 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
.........
Serverless: Stack update finished...
Service Information
........
Serverless: Run the "serverless" command to setup monitoring, troubleshooting and testing.
Serverless: Running plugin -> Serverless Bucket Notification Plugin
Serverless: Serverless Bucket Notification Plugin -> Done
```

Optionally you can put the notification configuration without deploy with the command `sls putEvent`.

Thanks for use, please report any problem [here](https://github.com/toryas/serverless-bucket-notification-plugin/issues)
