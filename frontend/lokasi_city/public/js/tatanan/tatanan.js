$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "/api-v1/intern/get-all-tatanan",
    dataType: "JSON",
    success: function (data) {
      // console.log(data, "ini data tatanan");
      var tatanan = "";
      let dataCoba = data.data.result;

      // ITERATING THROUGH OBJECTS
      $.each(dataCoba, function (key, value) {
        // console.log(value, "ini value");

        //CONSTRUCTION OF ROWS HAVING
        // DATA FROM JSON OBJECT
        tatanan += "<tr>";
        tatanan += "<td>" + value.nama_tatanan + "</td>";

        tatanan += "<td>" + value.jenis_indikator + "</td>";

        tatanan += "<td>" + value.kategori + "</td>";

        tatanan += "<td>" + value.nama_indikator + "</td>";

        tatanan += "<td>" + value.subindikator + "</td>";

        tatanan += "</tr>";
      });

      //INSERTING ROWS INTO TABLE
      $("#tabel_tatanan").append(tatanan);
    },
  });
});