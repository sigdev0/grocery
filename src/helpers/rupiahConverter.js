/**
 * Usage example:
 * alert(convertToRupiah(10000000)); -> "Rp. 10.000.000"
 */
export function convertToRupiah(angka) {
  var rupiah = "";
  var angkarev = angka.toString().split("").reverse().join("");
  for (var i = 0; i < angkarev.length; i++)
    if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
  return (
    "Rp " +
    rupiah
      .split("", rupiah.length - 1)
      .reverse()
      .join("")
  );
}

/**
 * Usage example:
 * alert(convertToAngka("Rp 10.000.123")); -> 10000123
 */

export function convertToAngka(rupiah) {
  return parseInt(rupiah.replace(/,.*|[^0-9]/g, ""), 10);
}
