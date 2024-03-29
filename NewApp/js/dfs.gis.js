/* A JavaScript implementation of the SHA family of hashes, as defined in FIPS
 * PUB 180-2 as well as the corresponding HMAC implementation as defined in
 * FIPS PUB 198a
 *
 * Version 1.3 Copyright Brian Turek 2008-2010
 * Distributed under the BSD License
 * See http://jssha.sourceforge.net/ for more information
 *
 * Several functions taken from Paul Johnson
 */
(function() { var charSize = 8, b64pad = "", hexCase = 0, str2binb = function(a) { var b = [], mask = (1 << charSize) - 1, length = a.length * charSize, i; for (i = 0; i < length; i += charSize) { b[i >> 5] |= (a.charCodeAt(i / charSize) & mask) << (32 - charSize - (i % 32)) } return b }, hex2binb = function(a) { var b = [], length = a.length, i, num; for (i = 0; i < length; i += 2) { num = parseInt(a.substr(i, 2), 16); if (!isNaN(num)) { b[i >> 3] |= num << (24 - (4 * (i % 8))) } else { return "INVALID HEX STRING" } } return b }, binb2hex = function(a) { var b = (hexCase) ? "0123456789ABCDEF" : "0123456789abcdef", str = "", length = a.length * 4, i, srcByte; for (i = 0; i < length; i += 1) { srcByte = a[i >> 2] >> ((3 - (i % 4)) * 8); str += b.charAt((srcByte >> 4) & 0xF) + b.charAt(srcByte & 0xF) } return str }, binb2b64 = function(a) { var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" + "0123456789+/", str = "", length = a.length * 4, i, j, triplet; for (i = 0; i < length; i += 3) { triplet = (((a[i >> 2] >> 8 * (3 - i % 4)) & 0xFF) << 16) | (((a[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4)) & 0xFF) << 8) | ((a[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4)) & 0xFF); for (j = 0; j < 4; j += 1) { if (i * 8 + j * 6 <= a.length * 32) { str += b.charAt((triplet >> 6 * (3 - j)) & 0x3F) } else { str += b64pad } } } return str }, rotr = function(x, n) { return (x >>> n) | (x << (32 - n)) }, shr = function(x, n) { return x >>> n }, ch = function(x, y, z) { return (x & y) ^ (~x & z) }, maj = function(x, y, z) { return (x & y) ^ (x & z) ^ (y & z) }, sigma0 = function(x) { return rotr(x, 2) ^ rotr(x, 13) ^ rotr(x, 22) }, sigma1 = function(x) { return rotr(x, 6) ^ rotr(x, 11) ^ rotr(x, 25) }, gamma0 = function(x) { return rotr(x, 7) ^ rotr(x, 18) ^ shr(x, 3) }, gamma1 = function(x) { return rotr(x, 17) ^ rotr(x, 19) ^ shr(x, 10) }, safeAdd_2 = function(x, y) { var a = (x & 0xFFFF) + (y & 0xFFFF), msw = (x >>> 16) + (y >>> 16) + (a >>> 16); return ((msw & 0xFFFF) << 16) | (a & 0xFFFF) }, safeAdd_4 = function(a, b, c, d) { var e = (a & 0xFFFF) + (b & 0xFFFF) + (c & 0xFFFF) + (d & 0xFFFF), msw = (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) + (e >>> 16); return ((msw & 0xFFFF) << 16) | (e & 0xFFFF) }, safeAdd_5 = function(a, b, c, d, e) { var f = (a & 0xFFFF) + (b & 0xFFFF) + (c & 0xFFFF) + (d & 0xFFFF) + (e & 0xFFFF), msw = (a >>> 16) + (b >>> 16) + (c >>> 16) + (d >>> 16) + (e >>> 16) + (f >>> 16); return ((msw & 0xFFFF) << 16) | (f & 0xFFFF) }, coreSHA2 = function(j, k, l) { var a, b, c, d, e, f, g, h, T1, T2, H, lengthPosition, i, t, K, W = [], appendedMessageLength; if (l === "SHA-224" || l === "SHA-256") { lengthPosition = (((k + 65) >> 9) << 4) + 15; K = [0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2]; if (l === "SHA-224") { H = [0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939, 0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4] } else { H = [0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19] } } j[k >> 5] |= 0x80 << (24 - k % 32); j[lengthPosition] = k; appendedMessageLength = j.length; for (i = 0; i < appendedMessageLength; i += 16) { a = H[0]; b = H[1]; c = H[2]; d = H[3]; e = H[4]; f = H[5]; g = H[6]; h = H[7]; for (t = 0; t < 64; t += 1) { if (t < 16) { W[t] = j[t + i] } else { W[t] = safeAdd_4(gamma1(W[t - 2]), W[t - 7], gamma0(W[t - 15]), W[t - 16]) } T1 = safeAdd_5(h, sigma1(e), ch(e, f, g), K[t], W[t]); T2 = safeAdd_2(sigma0(a), maj(a, b, c)); h = g; g = f; f = e; e = safeAdd_2(d, T1); d = c; c = b; b = a; a = safeAdd_2(T1, T2) } H[0] = safeAdd_2(a, H[0]); H[1] = safeAdd_2(b, H[1]); H[2] = safeAdd_2(c, H[2]); H[3] = safeAdd_2(d, H[3]); H[4] = safeAdd_2(e, H[4]); H[5] = safeAdd_2(f, H[5]); H[6] = safeAdd_2(g, H[6]); H[7] = safeAdd_2(h, H[7]) } switch (l) { case "SHA-224": return [H[0], H[1], H[2], H[3], H[4], H[5], H[6]]; case "SHA-256": return H; default: return [] } }, jsSHA = function(a, b) { this.sha224 = null; this.sha256 = null; this.strBinLen = null; this.strToHash = null; if ("HEX" === b) { if (0 !== (a.length % 2)) { return "TEXT MUST BE IN BYTE INCREMENTS" } this.strBinLen = a.length * 4; this.strToHash = hex2binb(a) } else if (("ASCII" === b) || ('undefined' === typeof (b))) { this.strBinLen = a.length * charSize; this.strToHash = str2binb(a) } else { return "UNKNOWN TEXT INPUT TYPE" } }; jsSHA.prototype = { getHash: function(a, b) { var c = null, message = this.strToHash.slice(); switch (b) { case "HEX": c = binb2hex; break; case "B64": c = binb2b64; break; default: return "FORMAT NOT RECOGNIZED" } switch (a) { case "SHA-224": if (null === this.sha224) { this.sha224 = coreSHA2(message, this.strBinLen, a) } return c(this.sha224); case "SHA-256": if (null === this.sha256) { this.sha256 = coreSHA2(message, this.strBinLen, a) } return c(this.sha256); default: return "HASH NOT RECOGNIZED" } }, getHMAC: function(a, b, c, d) { var e, keyToUse, i, retVal, keyBinLen, hashBitSize, keyWithIPad = [], keyWithOPad = []; switch (d) { case "HEX": e = binb2hex; break; case "B64": e = binb2b64; break; default: return "FORMAT NOT RECOGNIZED" } switch (c) { case "SHA-224": hashBitSize = 224; break; case "SHA-256": hashBitSize = 256; break; default: return "HASH NOT RECOGNIZED" } if ("HEX" === b) { if (0 !== (a.length % 2)) { return "KEY MUST BE IN BYTE INCREMENTS" } keyToUse = hex2binb(a); keyBinLen = a.length * 4 } else if ("ASCII" === b) { keyToUse = str2binb(a); keyBinLen = a.length * charSize } else { return "UNKNOWN KEY INPUT TYPE" } if (64 < (keyBinLen / 8)) { keyToUse = coreSHA2(keyToUse, keyBinLen, c); keyToUse[15] &= 0xFFFFFF00 } else if (64 > (keyBinLen / 8)) { keyToUse[15] &= 0xFFFFFF00 } for (i = 0; i <= 15; i += 1) { keyWithIPad[i] = keyToUse[i] ^ 0x36363636; keyWithOPad[i] = keyToUse[i] ^ 0x5C5C5C5C } retVal = coreSHA2(keyWithIPad.concat(this.strToHash), 512 + this.strBinLen, c); retVal = coreSHA2(keyWithOPad.concat(retVal), 512 + hashBitSize, c); return (e(retVal)) } }; window.jsSHA = jsSHA } ());

function Sha256(plainText) {
    var shaObj = new jsSHA(plainText, "ASCII");
    var hashedText = shaObj.getHash("SHA-256", "HEX");
    return hashedText;
}
function PrintRegion(regionId)
{
    var region = document.getElementById(regionId);
    var printableString = region.innerHTML;
    
    newwin=window.open('','printwin','left=0,top=0,width=600,height=600');
    newwin.document.write('<HTML>\n<HEAD>\n');
    newwin.document.write('<TITLE>Print Page</TITLE>\n');
    newwin.document.write('<script>\n');
    newwin.document.write('function chkstate(){\n');
    newwin.document.write('if(document.readyState=="complete"){\n');
    newwin.document.write('window.close()\n');
    newwin.document.write('}\n');
    newwin.document.write('else{\n');
    newwin.document.write('setTimeout("chkstate()",2000)\n');
    newwin.document.write('}\n');
    newwin.document.write('}\n');
    newwin.document.write('function print_win(){\n');
    newwin.document.write('window.print();\n');
    newwin.document.write('chkstate();\n');
    newwin.document.write('}\n');
    newwin.document.write('<\/script>\n');
    newwin.document.write('</HEAD>\n');
    newwin.document.write('<BODY onload="print_win()">\n');
    newwin.document.write(printableString);
    newwin.document.write('</BODY>\n');
    newwin.document.write('</HTML>\n');
    newwin.document.close();

}


function hasUpperCase(str) {
    for (x = 0; x < str.length; x++) {
        if (str.charAt(x) >= 'A' && str.charAt(x) <= 'Z')
            return true;
    }
    return false;
}

function hasNumeric(str) {
    for (x = 0; x < str.length; x++) {
        if (str.charAt(x) >= '0' && str.charAt(x) <= '9')
            return true;
    }
    return false;
}

function hasSpecialChar(str) {
    for (x = 0; x < str.length; x++) {
        switch (str.charAt(x)) {
            case '!':
            case '@':
            case '#':
            case '$':
            case '^':
            case '&':
            case '_':
                return true;
        }
    }
    return false;
}

//validate password for at least 1 upper case, 1 numeral, 1 special char, and length between 9-50 chars.
function ValidatePassword(str) {
    if (!hasUpperCase(str) || !hasNumeric(str) || !hasSpecialChar(str) || str.length < 8 || str.length > 50)
        return false;
    return true;
}

////sets value to 0 if nothing is specified.
//function Set0_OnFocusLost(id)
//{        
//    var txtbox = document.getElementById(id);
//    if(txtbox.value.trim().length<=0)
//             txtbox.value = '0';
//}



