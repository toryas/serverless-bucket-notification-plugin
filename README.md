# Toryas / Serverless Bucket Notification Plugin

## Upadate v2.0.0

 - Add support for multiples buckets to set notification

## How to use

Install the plugin with `npm i -D serverless-bucket-notification-plugin`

add the plugin in the serverless.yml file config

```yml
plugins:
  - serverless-bucket-notification-plugin # <- like this!
```

Add the configuration in the serverless.yml file to create a notification events in the bucket

```yml

custom:
  BucketNotificationConfig:
  - bucket: MyBucket # Required
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
  - bucket: MyBucket # Required
    notifications: # Required
      - topic:
            ...
      - topic:
            ...
      - lambda:
            ...
  - bucket: MyOtherBucket # Required
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
  - bucket: MyBucket # Required
    notifications: # Required
      - topic:
            ...
```

Finally the notification configuration add a events in yours buckets after stack deploy.

`sls deploy`

Optionally you can put the notification configuration without deploy with the command `sls putEvents`.

Thanks for use, please report any problem [here](https://github.com/toryas/serverless-bucket-notification-plugin/issues)
