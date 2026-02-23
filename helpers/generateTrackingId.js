const generateTrackingId = async (connection) => {
  const year = new Date().getFullYear();

  // "FOR UPDATE" locks the latest row so two people can't get the same number
  const [rows] = await connection.execute(
    `SELECT tracking_id FROM complaints 
     WHERE tracking_id LIKE ? 
     ORDER BY id DESC LIMIT 1 FOR UPDATE`,
    [`CPL-${year}-%`]
  );

  let sequence = 1;
  if (rows.length > 0 && rows[0].tracking_id) {
    const lastNumber = parseInt(rows[0].tracking_id.split("-")[2], 10);
    sequence = lastNumber + 1;
  }

  const padded = String(sequence).padStart(6, "0");
  return `CPL-${year}-${padded}`;
};

module.exports = generateTrackingId;