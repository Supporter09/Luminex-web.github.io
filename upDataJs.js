var json = (function () {
  var json = null;
  $.ajax({
    'async': false,
    'global': false,
    'url': "IMDb names.json",
    'dataType': "json",
    'success': function (data) {
      json = data;
    }
  });
  return json;
})();
console.log(json)

for (let data in json) {
  db.collection('films').add(json[data]);
}