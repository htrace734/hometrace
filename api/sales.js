module.exports = async function handler(req, res) {
  const { address } = req.query;
  if (!address) return res.status(400).json({ error: "Address required" });
  const parts = address.split(",");
  const address1 = parts[0]?.trim();
  const address2 = parts.slice(1).join(",").trim();
  try {
    const response = await fetch(
      `https://api.gateway.attomdata.com/propertyapi/v1.0.0/allevents/detail?address1=${encodeURIComponent(address1)}&address2=${encodeURIComponent(address2)}`,
      { headers: { "apikey": process.env.ATTOM_API_KEY, "Accept": "application/json" } }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

