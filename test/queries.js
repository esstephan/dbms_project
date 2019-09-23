const queryIterator = require('../queryIterator');

const findByIDQuery = [
    ["PROJECTION", ["name"]],
    ["SELECTION", ["id", "EQUALS", "5000"]],
    ["FILESCAN", ["movies"]]
]

const averageRatingsQuery = [
    ["AVERAGE"],
    ["PROJECTION", ["rating"]],
    ["SELECTION", ["movie_id", "EQUALS", "5000"]],
    ["FILESCAN", ["ratings"]]
];
