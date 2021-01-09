const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const counters = require("./counters");

const PORT = 3001;
const app = express();

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

const BASE_URL = "/api/v1/counter";

/**
 * [json] GET /api/v1/counter
 *
 * Response:
 *  [
 *    {id: 'asdf', title: 'boop',  count: 4},
 *    {id: 'zxcv', title: 'steve', count: 3}
 *  ]
 */
app.get(BASE_URL, function (_, res) {
  res.json(counters.all());
});

/**
 * [json] POST { title: 'bob' } /api/v1/counter
 *
 * Response:
 * ```
 * {id: 'qwer', title: 'bob',   count: 0}
 * ```
 */
app.post(BASE_URL, function (req, res) {
  if (req.body.title === undefined || req.body.title === null || req.body.title === '') {
    return res.status(400).send({ message: "'title' is required" });
  }

  res.json(counters.create(req.body.title));
});

/**
 * [json] DELETE { id: 'asdf' } /api/v1/counter
 *
 * Response:
 * ```
 *  'asdf'
 * ```
 */
app.delete(BASE_URL, function (req, res) {
  res.json(counters.delete(req.body.id));
});

/**
 * [json] POST { id: 'qwer' } /api/v1/counter/inc
 * 
 * Response:
 * ```
 *  {id: 'qwer', title: 'bob',   count: 1}
 * ```
 */
app.post(`${BASE_URL}/inc`, function (req, res) {
  res.json(counters.inc(req.body.id));
});

/**
 * [json] POST {id: 'zxcv'} /api/v1/counter/dec
 * 
 * Response:
 * ```
 *  {id: 'zxcv', title: 'steve', count: 2}
 * ```
 */
app.post(`${BASE_URL}/dec`, function (req, res) {
  res.json(counters.dec(req.body.id));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/**
 * ----------
 * Easter egg
 * ----------
 * 
 * fetch('/api/v1/counters', { method: 'get' })
 *    .then(res => res.json())
 *    .then(res => console.log(res))
 * 
 * fetch('/api/v1/counter', {
 *    method: 'post',
 *    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
 *    body: JSON.stringify(data)
 * })
 *    .then(res => res.json())
 *    .then(res => console.log(res))
 */
