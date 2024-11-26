import { client } from "../db.js";

export const TripModel = {
  async createTrip(user_id, start_location, end_location, start_time, end_time, trip_status) {
    const query = `
      INSERT INTO trip (user_id, start_location, end_location, start_time, end_time, trip_status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, user_id, start_location, end_location, start_time, end_time, trip_status;
    `;
    const values = [user_id, start_location, end_location, start_time, end_time, trip_status];
    const result = await client.query(query, values);
    return result.rows[0];
  },

  async getAllTrips() {
    const query = "SELECT id, user_id, start_location, end_location, start_time, end_time, trip_status FROM trip;";
    const result = await client.query(query);
    return result.rows;
  },

  async getTripById(id) {
    const query = "SELECT id, user_id, start_location, end_location, start_time, end_time, trip_status FROM trip WHERE id = $1;";
    const result = await client.query(query, [id]);
    return result.rows[0];
  }
};
