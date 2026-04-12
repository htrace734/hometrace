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

Tell me when done! 🚀how do i get back to the sales.js file12:46 PMYou're in the root of your repository. Just:

Click "Add file" → "Create new file"
In the filename box type exactly: netlify/functions/sales.js

GitHub will automatically create the folders as you type! 🚀
