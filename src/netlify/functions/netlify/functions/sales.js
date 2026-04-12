exports.handler = async function(event) {
  const { address } = event.queryStringParameters;
  
  if (!address) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Address required" })
    };
  }

  const parts = address.split(",");
  const address1 = parts[0]?.trim();
  const address2 = parts.slice(1).join(",").trim();

  try {
    const response = await fetch(
      `https://api.gateway.attomdata.com/propertyapi/v1.0.0/allevents/detail?address1=${encodeURIComponent(address1)}&address2=${encodeURIComponent(address2)}`,
      {
        headers: {
          "apikey": process.env.ATTOM_API_KEY,
          "Accept": "application/json"
        }
      }
    );
    const data = await response.json();
    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};

Click "Commit changes" twice

Tell me when done! 🚀should i delete the previous file name11:35 AMNo — leave all the existing files exactly as they are. Just add these new ones on top of what's already there.
Your repository should have:

index.html ✅ keep
src/App.jsx ✅ keep
package.json ✅ keep
vite.config.js ✅ keep
netlify/functions/property.js ← new
netlify/functions/sales.js ← new (doing this now)

Done with the second file? 🚀
