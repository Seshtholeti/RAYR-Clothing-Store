# RAYర్ Clothing Store

A responsive, minimal streetwear storefront starter for RAYర్.

## Run locally
Open `index.html` in a browser, or run a local server from this folder:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Features
- Responsive landing page and collection grid
- Product quick-view modal with colour and size selection
- Shopping bag drawer with quantity editing and subtotal
- Product filters, sorting and search
- Newsletter signup front-end interaction
- RAYర్ identity with off-white, black and red styling

## Demo limitations before launch
- The storefront now uses a six-colour photorealistic concept T-shirt sprite for the carousel and product tiles. These are design mockups, not photos of manufactured inventory; replace them with your own product photos before accepting orders.
- Product titles, price points, fits, GSM descriptions, and colour options are sample content.
- The bag is client-side only. Checkout, orders, inventory, shipping rates, tax calculation, returns, and payment processing are not connected.
- Newsletter signup is a visual demo; connect it to an email platform.
- Replace the text-based wordmark with the approved logo SVG for consistent Telugu lettering and print production.
- Update contact and social links, legal policies, privacy notice, and shipping/return details.

## Deploy with GitHub Pages
In the repository settings, open **Pages**, select **Deploy from a branch**, select `main` and `/ (root)`, then save. GitHub Pages will publish the static front end. A live static site still will not process payments until you integrate a commerce backend.


## Automatic production deployment (GitHub Actions)

The workflow at `.github/workflows/deploy-vercel.yml` deploys the site to Vercel whenever code is pushed to `main`, or when triggered manually from the Actions tab.

One repository secret is required:

1. In Vercel, open **Account Settings → Tokens** and create a token with access to the team that owns this project.
2. In GitHub, open **Settings → Secrets and variables → Actions → New repository secret**.
3. Add the secret name `VERCEL_TOKEN` and paste the Vercel token value directly into GitHub. Do not share the token in chat or commit it to the repository.
4. Open the repository's **Actions** tab and run **Deploy RAYR Store to Vercel** once to test it. Later pushes to `main` will deploy automatically.

The workflow uses the existing Vercel project and team IDs in its configuration. If GitHub Actions reports a permission or project access error, ensure the token was created for the team that owns `rayr-clothing-store`.

The Vercel GitHub App connection is still separate; this workflow is the CI/CD fallback and does not require Vercel's built-in Git integration to discover the repository.
