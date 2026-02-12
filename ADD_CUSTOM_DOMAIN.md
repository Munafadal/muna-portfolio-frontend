# How to Add Custom Domain to AWS Amplify

## Quick Steps

1. **Go to Domain Management:**
   - In Amplify Console: https://eu-west-2.console.aws.amazon.com/amplify/apps/d1uw1mkx15ro9e
   - Left sidebar → "Domain management"

2. **Add Domain:**
   - Click "Add domain"
   - Enter your domain (e.g., `example.com`)
   - Click "Configure domain"

3. **Configure:**
   - Select branch: "main"
   - Choose subdomain (e.g., `www` or root)
   - Copy DNS records provided

4. **Update DNS:**
   - Go to your DNS provider (GoDaddy, Namecheap, Route 53, etc.)
   - Add the CNAME record provided by Amplify
   - Wait for DNS propagation (5 minutes - 48 hours)

5. **Wait for SSL:**
   - Amplify automatically provisions SSL certificate
   - Takes 5-30 minutes
   - Status will show "Available" when ready

## DNS Record Example

```
Type: CNAME
Name: www (or your subdomain)
Value: main.d1uw1mkx15ro9e.amplifyapp.com
TTL: 3600 (or default)
```

## Common Providers

### GoDaddy
1. Go to DNS Management
2. Add CNAME record
3. Name: `www` (or subdomain)
4. Value: `main.d1uw1mkx15ro9e.amplifyapp.com`

### Namecheap
1. Go to Advanced DNS
2. Add CNAME record
3. Host: `www` (or subdomain)
4. Value: `main.d1uw1mkx15ro9e.amplifyapp.com`

### Route 53 (AWS)
- Amplify can update automatically if domain is in Route 53

## Verification

After adding DNS records:
- Check status in Amplify Console
- Should change from "Pending" → "Available"
- SSL certificate will be provisioned automatically

## Troubleshooting

- **Verification fails:** Check DNS records are correct
- **SSL pending:** Wait 30-60 minutes
- **Domain not working:** Check DNS propagation with `nslookup` or `dig`
