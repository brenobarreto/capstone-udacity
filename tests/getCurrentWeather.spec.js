const regeneratorRuntime = require("regenerator-runtime");
const getCurrentWeather = require('server/index');

test('getCurrentWeather function returns a defined value', () => {
    expect((getCurrentWeather())).toBeDefined();
})