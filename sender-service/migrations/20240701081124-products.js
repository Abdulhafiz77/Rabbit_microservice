
var dbm;
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.runSql(`

      CREATE TABLE public.product (
        id            SERIAL PRIMARY KEY,
        name          VARCHAR(50) DEFAULT NULL,
        description   VARCHAR(250) DEFAULT NULL,
        features      VARCHAR(250) DEFAULT NULL,
        price         INTEGER DEFAULT NULL,
        keywords      VARCHAR(255) DEFAULT NULL,
        url           VARCHAR(255) DEFAULT NULL,
        category      VARCHAR(50) NOT NULL,
        subcategory   VARCHAR(50) DEFAULT NULL,
        created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
        status        INTEGER DEFAULT 10,
        count         INTEGER DEFAULT 0
      );
         `, function (err) {
    if (err) return callback(err);
    callback();
  });
};

exports.down = function (db, callback) {
  db.runSql(`
          DROP TABLE IF EXISTS public.product;
          `, function (err) {
    if (err) return callback(err);
    callback();
  });
};

exports._meta = {
  version: 1
};