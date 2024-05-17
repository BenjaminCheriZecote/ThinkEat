import client from '../helpers/pg.client.js';

export default class CoreDatamapper {
  static tableName;

  /**
   * @param {object} filter
   * @param {object} filter.where property name = value 
   * @returns {array} Array of element found
   */
  static async findAll({filter, criteria, orderBy, page, number}={}, user) {
    let query = {
      text: `SELECT *, COUNT(*) OVER() AS total FROM find_${this.tableName}(${user ? "$1::json" : ""})`,
      values: user ? [ user ] : []
    };
    if (filter || criteria) {
      query = this.addWhereToQuery({filter, criteria, query});
    }
    if (orderBy) {
      query = this.addOrderByToQuery({orderBy, query});
    }
    if (page) {
      query = this.addPaginationToQuery({page, query, number});
    }
    let result = await client.query(query);
    if (result.rows.length === 0) {
      query.text = query.text.replace(/\s+LIMIT\s+\d+(\s+OFFSET\s+\d+)?;?/i, '');
      query = this.addPaginationToQuery({page:'1', query, number});
    }
    result = await client.query(query);

    return result.rows;
  }

  /**
   * @param {integer} id search element by id
   * @returns {object} element
   */
  static async findByPk(id) {
    const result = await client.query(`SELECT * FROM find_${this.tableName}($1::int)`, [id]);
    return result.rows[0];
  }

  /**
   * @param {object} data contain property for create element
   * @returns {object} element
   */
  static async create(data) {
    const result = await client.query(
      `SELECT * FROM create_${this.tableName}($1)`,
      [data],
    );
    return result.rows[0];
  }

  /**
   * @param {object} data contain property for update element
   * @returns {object} element
   */
  static async update(data) {
    const result = await client.query(
      `SELECT * FROM update_${this.tableName}($1)`,
      [data],
    );
    return result.rows[0];
  }

  /**
   * @param {integer} id delete element by id
   * @returns {object} element
   */
  static async delete(id) {
    const result = await client.query(`SELECT * FROM delete_${this.tableName}($1)`, [id]);
    // 0 devient false et 1 devient true
    return !!result.rowCount;
  }
}