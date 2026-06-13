function extractRollNumber(qrData) {
  if (!qrData || typeof qrData !== "string") {
    return null;
  }

  const match1 = qrData.match(/02\.(\d+),/);
  if (match1) return match1[1];

  const match2 = qrData.match(/(\d{4,6})/);
  if (match2) return match2[1];

  return null;
}
//sample qrstring
//02.{urrollno.},x,xxxxxxx,xxxxxxxxxxxxxxxxxxxxxxxx/xxxxxxxxxxxx+xxxx/axkLNCiHNCGPj/a5brtuRZ8IbgTY5HV1.iitkidcard
module.exports = {
  extractRollNumber,
};

//console.log(extractRollNumber("02.250489,1,1781011227,MEYCIQCuFvrAWNvvUpjDei7bjcBLBCHMo4Gd/8hgKP6Qaoam2wIhANKQXSG+a5Z/axkLNCiHNCGPj/a5brtuRZ8IbgTY5HV1.iitkidcard"));