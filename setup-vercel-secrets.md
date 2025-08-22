# Setting Up Vercel Deployment via GitHub Actions

## 🔑 **Required Secrets**

You need to add these secrets to your GitHub repository:

### **1. VERCEL_TOKEN**
- Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
- Create a new token with a descriptive name (e.g., "GitHub Actions Deploy")
- Copy the token value

### **2. ORG_ID**
- Value: `ben-drolets-projects`
- This is your Vercel organization/team name

### **3. PROJECT_ID**
- Value: `prj_mfSvXYhrdMxAyAS1U12FU7p2tCyI`
- This is your specific project ID

## 📝 **How to Add Secrets**

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret with the exact names above

## 🚀 **How It Works**

1. **Push to main** → Tests run automatically
2. **Tests pass** → Vercel deployment starts
3. **Tests fail** → No deployment (workflow fails)

## ✅ **Benefits**

- ✅ **No broken deployments** when tests fail
- ✅ **Full control** over deployment process
- ✅ **Automatic deployment** when tests pass
- ✅ **Professional CI/CD** pipeline

## 🔧 **Alternative: Get Token via CLI**

If you prefer to get your token via CLI:

```bash
# Create a new token
vercel token create "GitHub Actions Deploy"

# This will output your token - copy it!
```

## 🎯 **Next Steps**

1. Add the secrets to GitHub
2. Push this workflow to test it
3. Verify deployment only happens after tests pass
