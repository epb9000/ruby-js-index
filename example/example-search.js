function exampleSearch(search,fuzziness) {

    if (search.replace(/\s+/, '') == "") {
        return [];
    }
    //Source: https://github.com/kristopolous/Porter-Stemmer
    let stemmer=function(){function h(){}function i(){console.log(Array.prototype.slice.call(arguments).join(" "))}var j={ational:"ate",tional:"tion",enci:"ence",anci:"ance",izer:"ize",bli:"ble",alli:"al",entli:"ent",eli:"e",ousli:"ous",ization:"ize",ation:"ate",ator:"ate",alism:"al",iveness:"ive",fulness:"ful",ousness:"ous",aliti:"al",iviti:"ive",biliti:"ble",logi:"log"},k={icate:"ic",ative:"",alize:"al",iciti:"ic",ical:"ic",ful:"",ness:""};return function(a,l){var d,b,g,c,f,e;e=l?i:h;if(3>a.length)return a;
        g=a.substr(0,1);"y"==g&&(a=g.toUpperCase()+a.substr(1));c=/^(.+?)(ss|i)es$/;b=/^(.+?)([^s])s$/;c.test(a)?(a=a.replace(c,"$1$2"),e("1a",c,a)):b.test(a)&&(a=a.replace(b,"$1$2"),e("1a",b,a));c=/^(.+?)eed$/;b=/^(.+?)(ed|ing)$/;c.test(a)?(b=c.exec(a),c=/^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*/,c.test(b[1])&&(c=/.$/,a=a.replace(c,""),e("1b",c,a))):b.test(a)&&(b=b.exec(a),d=b[1],b=/^([^aeiou][^aeiouy]*)?[aeiouy]/,b.test(d)&&(a=d,e("1b",b,a),b=/(at|bl|iz)$/,f=/([^aeiouylsz])\1$/,d=/^[^aeiou][^aeiouy]*[aeiouy][^aeiouwxy]$/,
        b.test(a)?(a+="e",e("1b",b,a)):f.test(a)?(c=/.$/,a=a.replace(c,""),e("1b",f,a)):d.test(a)&&(a+="e",e("1b",d,a))));c=/^(.*[aeiouy].*)y$/;c.test(a)&&(b=c.exec(a),d=b[1],a=d+"i",e("1c",c,a));c=/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;c.test(a)&&(b=c.exec(a),d=b[1],b=b[2],c=/^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*/,c.test(d)&&(a=d+j[b],e("2",c,a)));c=/^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
        c.test(a)&&(b=c.exec(a),d=b[1],b=b[2],c=/^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*/,c.test(d)&&(a=d+k[b],e("3",c,a)));c=/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;b=/^(.+?)(s|t)(ion)$/;c.test(a)?(b=c.exec(a),d=b[1],c=/^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*/,c.test(d)&&(a=d,e("4",c,a))):b.test(a)&&(b=b.exec(a),d=b[1]+b[2],b=/^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*/,
        b.test(d)&&(a=d,e("4",b,a)));c=/^(.+?)e$/;if(c.test(a)&&(b=c.exec(a),d=b[1],c=/^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*/,b=/^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*([aeiouy][aeiou]*)?$/,f=/^[^aeiou][^aeiouy]*[aeiouy][^aeiouwxy]$/,c.test(d)||b.test(d)&&!f.test(d)))a=d,e("5",c,b,f,a);c=/ll$/;b=/^([^aeiou][^aeiouy]*)?[aeiouy][aeiou]*[^aeiou][^aeiouy]*[aeiouy][aeiou]*[^aeiou][^aeiouy]*/;c.test(a)&&b.test(a)&&(c=/.$/,a=a.replace(c,""),e("5",
        c,b,a));"y"==g&&(a=g.toLowerCase()+a.substr(1));return a}}();

    // Begin levenshtein https://github.com/gustf/js-levenshtein
    function _min(d0, d1, d2, bx, ay)
    {
      return d0 < d1 || d2 < d1
          ? d0 > d2
              ? d2 + 1
              : d0 + 1
          : bx === ay
              ? d1
              : d1 + 1;
    }
    function levenshtein(a, b)
    {
      if (a === b) {
        return 0;
      }
  
      if (a.length > b.length) {
        var tmp = a;
        a = b;
        b = tmp;
      }
  
      var la = a.length;
      var lb = b.length;
  
      while (la > 0 && (a.charCodeAt(la - 1) === b.charCodeAt(lb - 1))) {
        la--;
        lb--;
      }
  
      var offset = 0;
  
      while (offset < la && (a.charCodeAt(offset) === b.charCodeAt(offset))) {
        offset++;
      }
  
      la -= offset;
      lb -= offset;
  
      if (la === 0 || lb < 3) {
        return lb;
      }
  
      var x = 0;
      var y;
      var d0;
      var d1;
      var d2;
      var d3;
      var dd;
      var dy;
      var ay;
      var bx0;
      var bx1;
      var bx2;
      var bx3;
  
      var vector = [];
  
      for (y = 0; y < la; y++) {
        vector.push(y + 1);
        vector.push(a.charCodeAt(offset + y));
      }
  
      var len = vector.length - 1;
  
      for (; x < lb - 3;) {
        bx0 = b.charCodeAt(offset + (d0 = x));
        bx1 = b.charCodeAt(offset + (d1 = x + 1));
        bx2 = b.charCodeAt(offset + (d2 = x + 2));
        bx3 = b.charCodeAt(offset + (d3 = x + 3));
        dd = (x += 4);
        for (y = 0; y < len; y += 2) {
          dy = vector[y];
          ay = vector[y + 1];
          d0 = _min(dy, d0, d1, bx0, ay);
          d1 = _min(d0, d1, d2, bx1, ay);
          d2 = _min(d1, d2, d3, bx2, ay);
          dd = _min(d2, d3, dd, bx3, ay);
          vector[y] = dd;
          d3 = d2;
          d2 = d1;
          d1 = d0;
          d0 = dy;
        }
      }
  
      for (; x < lb;) {
        bx0 = b.charCodeAt(offset + (d0 = x));
        dd = ++x;
        for (y = 0; y < len; y += 2) {
          dy = vector[y];
          vector[y] = dd = _min(dy, d0, dd, bx0, vector[y + 1]);
          d0 = dy;
        }
      }
  
      return dd;
    }
    let fuzz = fuzziness || 1;
    //str.downcase.sub(/["']/,"").split(/[^\w0-9]+/)
    // Actually do a very simple search.
    let index_content = {"docmeta":{},"documents":["idline","longdouble","drilldozer"],"index":{"remain":[0],"line":[0],"index":[0,2],"text":[0],"long":[1],"doubl":[1],"construct":[1],"imagin":[1],"game":[1,2],"drill":[2],"dozer":[2],"receiv":[2],"posit":[2],"review":[2],"releas":[2],"consid":[2],"boi":[2],"advanc":[2],"time":[2]},"idf":{"remain":0.47712125471966244,"line":0.47712125471966244,"index":0.17609125905568124,"text":0.47712125471966244,"long":0.47712125471966244,"doubl":0.47712125471966244,"construct":0.47712125471966244,"imagin":0.47712125471966244,"game":0.17609125905568124,"drill":0.47712125471966244,"dozer":0.47712125471966244,"receiv":0.47712125471966244,"posit":0.47712125471966244,"review":0.47712125471966244,"releas":0.47712125471966244,"consid":0.47712125471966244,"boi":0.47712125471966244,"advanc":0.47712125471966244,"time":0.47712125471966244}};
    let terms = search.toLowerCase().replace(/["']/g, "").split(/[^\w0-9]+/)
    let index = 0;
    let matches = [];
    for(index = 0; index < terms.length; index++) {
        let term = terms[index];
        let stemmed_term = stemmer(term);
        if (fuzz == 0) {
            if (index_content.index[stemmed_term]) {
                matches.push(index_content.index[stemmed_term]);
            }
        } else {
            for (index_term in index_content.index) {
                if (levenshtein(index_term, stemmed_term) <= fuzz ||
                    levenshtein(index_term, term) <= fuzz) {
                    matches.push({"t":index_term,"match_docs":index_content.index[index_term]});
                }
            }
        }
    }
    if (matches.length == 0) {
        return [];
    }
    //Assign score...
    let docs = {};
    let x = 0;
    for(index = 0; index < matches.length; index++) {
        let docs_matched = matches[index].match_docs;
        let termIdf = index_content.idf[matches[index].t];
        for (x = 0; x < docs_matched.length; x++) {
            let document_name = index_content.documents[docs_matched[x]];
            docs[document_name] = docs[document_name] ? docs[document_name] + termIdf : termIdf;
        }
    }
    let return_docs = [];
    for (doc in docs) {
        return_docs.push({"document": doc, "score": docs[doc], "meta":(index_content.docsmeta[doc] || null) });
    }
    return return_docs.sort(function(a,b) {
        return b.score - a.score;
    });
}
