# AWS S3 Setup for CV Storage

This guide will help you set up AWS S3 to store CV files permanently, preventing them from being deleted when Railway restarts.

## Prerequisites

- An AWS account (free tier is sufficient)
- Access to AWS Console

## Step 1: Create an S3 Bucket

1. Go to [AWS S3 Console](https://s3.console.aws.amazon.com/)
2. Click **"Create bucket"**
3. Configure the bucket:
   - **Bucket name**: Choose a unique name (e.g., `muna-portfolio-cv`)
   - **AWS Region**: Choose a region close to your users (e.g., `us-east-1`, `eu-west-2` for London)
   - **Object Ownership**: Select **"ACLs enabled"** and **"Bucket owner preferred"**
   - **Block Public Access**: **Uncheck all boxes** (we need public access for CV files)
   - **Bucket Versioning**: Optional (can be disabled)
   - **Default encryption**: Optional (can use default settings)
4. Click **"Create bucket"**

## Step 2: Disable Block Public Access (IMPORTANT - Do This First!)

**⚠️ You MUST do this step BEFORE adding the bucket policy, or you'll get an error!**

1. Go to your bucket (click on its name)
2. Click the **"Permissions"** tab at the top
3. Scroll down to **"Block Public Access settings for this bucket"**
4. Click **"Edit"**
5. **Uncheck ALL 4 boxes**:
   - ☐ Block all public access
   - ☐ Block public access to buckets and objects granted through new access control lists (ACLs)
   - ☐ Block public access to buckets and objects granted through any access control lists (ACLs)
   - ☐ Block public access to buckets and objects granted through new public bucket or access point policies
   - ☐ Block public and cross-account access to buckets and objects through any public bucket or access point policies
6. AWS will ask you to type `confirm` to confirm this change
7. Type `confirm` and click **"Save changes"**

**Why?** This allows your bucket to have a public policy so CV files can be accessed by anyone.

## Step 3: Configure Bucket Policy for Public Access

This step makes your CV files publicly accessible so they can be viewed in the browser.

1. Go to your bucket → Click on the **"Permissions"** tab (at the top)
2. Scroll down to the **"Bucket policy"** section
3. Click the **"Edit"** button
4. You'll see a text box. Paste this policy into it:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
    }
  ]
}
```

5. **IMPORTANT**: Replace `YOUR_BUCKET_NAME` with the actual name of your bucket.

   **Example**: If your bucket name is `muna-portfolio-cv`, the policy should look like this:
   
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::muna-portfolio-cv/*"
       }
     ]
   }
   ```
   
   **Important Notes:**
   - Replace `YOUR_BUCKET_NAME` with your exact bucket name (case-sensitive)
   - Make sure there are **three colons** (`:::`) between `s3:` and your bucket name
   - Make sure there's a `/*` at the end (this means "all files in the bucket")
   - For your bucket `muna-portfolio-cv`, use exactly: `arn:aws:s3:::muna-portfolio-cv/*`

6. **Before saving**, double-check:
   - No extra spaces
   - Bucket name matches exactly (including hyphens)
   - The ARN format is: `arn:aws:s3:::BUCKET_NAME/*`

7. Click **"Save changes"** at the bottom

**If you still get an error**, try this alternative policy format (replace `muna-portfolio-cv` with your bucket name):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::muna-portfolio-cv/*"
    }
  ]
}
```

(Note: Removed the "Sid" field - some AWS accounts prefer this simpler format)

**What this does**: This policy allows anyone on the internet to read (download/view) files from your bucket, which is needed so your CV can be displayed in the browser.

## Step 4: Create IAM User for API Access

1. Go to [IAM Console](https://console.aws.amazon.com/iam/)
2. Click **"Users"** → **"Create user"**
3. **User name**: `portfolio-cv-uploader` (or any name you prefer)
4. **Select AWS credential type**: Leave unchecked (we'll create access keys separately)
5. Click **"Next"**
6. **Set permissions**: Click **"Attach policies directly"**
7. Search for and select **"AmazonS3FullAccess"** (or create a more restrictive policy)
8. Click **"Next"** → **"Create user"**

## Step 4b: Create Access Keys for the User

**After creating the user, you need to create access keys separately:**

1. Click on the user name (`portfolio-cv-uploader`) in the Users list
2. Click the **"Security credentials"** tab (at the top)
3. Scroll down to **"Access keys"** section
4. Click **"Create access key"** button
5. Select **"Application running outside AWS"** (or "Other")
6. Click **"Next"**
7. (Optional) Add a description like "For portfolio CV uploads"
8. Click **"Create access key"**
9. **IMPORTANT - DO THIS NOW**: You'll see a page with:
   - **Access key ID** (starts with something like `AKIA...`)
   - **Secret access key** (a long random string)
   
   **Copy BOTH immediately!** You can:
   - Click **"Show"** next to the secret key to reveal it
   - Copy the Access key ID
   - Copy the Secret access key
   - **Download .csv file** (recommended - saves both keys safely)
   
   ⚠️ **You won't be able to see the secret key again after you close this page!**

10. Click **"Done"** after you've saved the keys

## Step 5: Add Environment Variables to Railway

1. Go to your Railway project → **Variables** tab
2. Add these environment variables:

```
AWS_ACCESS_KEY_ID=your_access_key_id_here
AWS_SECRET_ACCESS_KEY=your_secret_access_key_here
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=your_bucket_name_here
```

Replace:
- `your_access_key_id_here` with your Access Key ID from Step 3
- `your_secret_access_key_here` with your Secret Access Key from Step 3
- `us-east-1` with your bucket's region (e.g., `eu-west-2` for London)
- `your_bucket_name_here` with your bucket name from Step 1

3. Click **"Deploy"** or trigger a new deployment

## Step 6: Install Dependencies and Deploy

The code is already updated to use S3. You just need to:

1. Install the AWS SDK (if not already installed):
   ```bash
   cd muna-portfolio-backend
   npm install
   ```

2. Commit and push the changes:
   ```bash
   git add .
   git commit -m "Add S3 support for CV storage"
   git push
   ```

3. Railway will automatically rebuild and deploy

## Step 7: Test the Upload

1. Go to your Swagger UI: `https://your-railway-url/api/docs`
2. Find **POST /api/cv/upload**
3. Upload a CV file
4. Check the response - it should show:
   ```json
   {
     "message": "CV uploaded successfully",
     "cv": "https://your-bucket.s3.region.amazonaws.com/cv/filename.pdf",
     "storage": "S3"
   }
   ```
5. The CV URL should now be a full S3 URL that persists across Railway restarts!

## Troubleshooting

### "S3 is not configured" error
- Check that all environment variables are set in Railway
- Verify the variable names match exactly (case-sensitive)
- Redeploy after adding variables

### "Access Denied" error
- Verify the bucket policy allows public read access
- Check that Block Public Access is disabled
- Ensure the IAM user has S3 permissions

### Files not accessible
- Verify the bucket policy is correct
- Check that the bucket name in the environment variable matches exactly
- Ensure the region matches your bucket's region

## Cost Estimate

- **S3 Storage**: First 5GB free, then ~$0.023 per GB/month
- **Data Transfer**: First 1GB free per month, then ~$0.09 per GB
- **Requests**: First 2,000 PUT requests free, then $0.005 per 1,000 requests

For a portfolio site with a few CV uploads, this should be **completely free** on AWS Free Tier.

## Security Note

The IAM user has full S3 access. For better security, you can create a custom policy that only allows:
- `s3:PutObject` on your specific bucket
- `s3:DeleteObject` on your specific bucket
- `s3:GetObject` on your specific bucket (optional, for verification)

This limits access to only your CV bucket.
