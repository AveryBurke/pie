(()=>{function t(t){return t&&t.__esModule?t.default:t}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},i={},r=e.parcelRequiredb4e;null==r&&((r=function(t){if(t in n)return n[t].exports;if(t in i){var e=i[t];delete i[t];var r={id:t,exports:{}};return n[t]=r,e.call(r.exports,r,r.exports),r.exports}var s=new Error("Cannot find module '"+t+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(t,e){i[t]=e},e.parcelRequiredb4e=r),importScripts("./backgroundWorker.13776449.js");var s=r("4wXTk"),h=r("35YzH");class a{_oldestIndex=1;_newestIndex=1;_storage={};size(){return this._newestIndex-this._oldestIndex}enqueue(t){this._storage[this._newestIndex]=t,this._newestIndex++}dequeue(){let t,e=this._oldestIndex;if(e!==this._newestIndex)return t=this._storage[e],delete this._storage[e],this._oldestIndex++,t}}var o=r("gVAGA");function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function g(t){return function(t){if(Array.isArray(t))return l(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return l(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}var c={a:7,c:6,h:1,l:2,m:2,q:4,s:4,t:2,v:1,z:0},f=/([astvzqmhlc])([^astvzqmhlc]*)/gi,x=/-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi,p=function(t,e,n,i){var r=this;u(this,"x0",void 0),u(this,"x1",void 0),u(this,"y0",void 0),u(this,"y1",void 0),u(this,"getTotalLength",(function(){return Math.sqrt(Math.pow(r.x0-r.x1,2)+Math.pow(r.y0-r.y1,2))})),u(this,"getPointAtLength",(function(t){var e=t/Math.sqrt(Math.pow(r.x0-r.x1,2)+Math.pow(r.y0-r.y1,2));e=Number.isNaN(e)?1:e;var n=(r.x1-r.x0)*e,i=(r.y1-r.y0)*e;return{x:r.x0+n,y:r.y0+i}})),u(this,"getTangentAtLength",(function(t){var e=Math.sqrt((r.x1-r.x0)*(r.x1-r.x0)+(r.y1-r.y0)*(r.y1-r.y0));return{x:-(r.x1-r.x0)/e,y:-(r.y1-r.y0)/e}})),u(this,"getPropertiesAtLength",(function(t){var e=r.getPointAtLength(t),n=r.getTangentAtLength(t);return{x:e.x,y:e.y,tangentX:n.x,tangentY:n.y}})),this.x0=t,this.x1=e,this.y0=n,this.y1=i},v=function(t,e,n,i,r,s,h,a,o){var g=this;u(this,"x0",void 0),u(this,"y0",void 0),u(this,"rx",void 0),u(this,"ry",void 0),u(this,"xAxisRotate",void 0),u(this,"LargeArcFlag",void 0),u(this,"SweepFlag",void 0),u(this,"x1",void 0),u(this,"y1",void 0),u(this,"length",void 0),u(this,"getTotalLength",(function(){return g.length})),u(this,"getPointAtLength",(function(t){t<0?t=0:t>g.length&&(t=g.length);var e=d({x:g.x0,y:g.y0},g.rx,g.ry,g.xAxisRotate,g.LargeArcFlag,g.SweepFlag,{x:g.x1,y:g.y1},t/g.length);return{x:e.x,y:e.y}})),u(this,"getTangentAtLength",(function(t){t<0?t=0:t>g.length&&(t=g.length);var e,n=.05,i=g.getPointAtLength(t);t<0?t=0:t>g.length&&(t=g.length);var r=(e=t<g.length-n?g.getPointAtLength(t+n):g.getPointAtLength(t-n)).x-i.x,s=e.y-i.y,h=Math.sqrt(r*r+s*s);return t<g.length-n?{x:-r/h,y:-s/h}:{x:r/h,y:s/h}})),u(this,"getPropertiesAtLength",(function(t){var e=g.getTangentAtLength(t),n=g.getPointAtLength(t);return{x:n.x,y:n.y,tangentX:e.x,tangentY:e.y}})),this.x0=t,this.y0=e,this.rx=n,this.ry=i,this.xAxisRotate=r,this.LargeArcFlag=s,this.SweepFlag=h,this.x1=a,this.y1=o;var l=y(300,(function(u){return d({x:t,y:e},n,i,r,s,h,{x:a,y:o},u)}));this.length=l.arcLength},d=function(t,e,n,i,r,s,h,a){e=Math.abs(e),n=Math.abs(n),i=A(i,360);var o=M(i);if(t.x===h.x&&t.y===h.y)return{x:t.x,y:t.y,ellipticalArcAngle:0};if(0===e||0===n)return{x:0,y:0,ellipticalArcAngle:0};var u=(t.x-h.x)/2,g=(t.y-h.y)/2,l={x:Math.cos(o)*u+Math.sin(o)*g,y:-Math.sin(o)*u+Math.cos(o)*g},c=Math.pow(l.x,2)/Math.pow(e,2)+Math.pow(l.y,2)/Math.pow(n,2);c>1&&(e=Math.sqrt(c)*e,n=Math.sqrt(c)*n);var f=(Math.pow(e,2)*Math.pow(n,2)-Math.pow(e,2)*Math.pow(l.y,2)-Math.pow(n,2)*Math.pow(l.x,2))/(Math.pow(e,2)*Math.pow(l.y,2)+Math.pow(n,2)*Math.pow(l.x,2));f=f<0?0:f;var x=(r!==s?1:-1)*Math.sqrt(f),p=x*(e*l.y/n),v=x*(-n*l.x/e),d={x:Math.cos(o)*p-Math.sin(o)*v+(t.x+h.x)/2,y:Math.sin(o)*p+Math.cos(o)*v+(t.y+h.y)/2},y={x:(l.x-p)/e,y:(l.y-v)/n},w=b({x:1,y:0},y),L=b(y,{x:(-l.x-p)/e,y:(-l.y-v)/n});!s&&L>0?L-=2*Math.PI:s&&L<0&&(L+=2*Math.PI);var m=w+(L%=2*Math.PI)*a,P=e*Math.cos(m),_=n*Math.sin(m);return{x:Math.cos(o)*P-Math.sin(o)*_+d.x,y:Math.sin(o)*P+Math.cos(o)*_+d.y,ellipticalArcStartAngle:w,ellipticalArcEndAngle:w+L,ellipticalArcAngle:m,ellipticalArcCenter:d,resultantRx:e,resultantRy:n}},y=function(t,e){t=t||500;for(var n,i=0,r=[],s=[],h=e(0),a=0;a<t;a++){var o=L(a*(1/t),0,1);n=e(o),i+=w(h,n),s.push([h,n]),r.push({t:o,arcLength:i}),h=n}return n=e(1),s.push([h,n]),i+=w(h,n),r.push({t:1,arcLength:i}),{arcLength:i,arcLengthMap:r,approximationLines:s}},A=function(t,e){return(t%e+e)%e},M=function(t){return t*(Math.PI/180)},w=function(t,e){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))},L=function(t,e,n){return Math.min(Math.max(t,e),n)},b=function(t,e){var n=t.x*e.x+t.y*e.y,i=Math.sqrt((Math.pow(t.x,2)+Math.pow(t.y,2))*(Math.pow(e.x,2)+Math.pow(e.y,2)));return(t.x*e.y-t.y*e.x<0?-1:1)*Math.acos(n/i)},m=[[],[],[-.5773502691896257,.5773502691896257],[0,-.7745966692414834,.7745966692414834],[-.33998104358485626,.33998104358485626,-.8611363115940526,.8611363115940526],[0,-.5384693101056831,.5384693101056831,-.906179845938664,.906179845938664],[.6612093864662645,-.6612093864662645,-.2386191860831969,.2386191860831969,-.932469514203152,.932469514203152],[0,.4058451513773972,-.4058451513773972,-.7415311855993945,.7415311855993945,-.9491079123427585,.9491079123427585],[-.1834346424956498,.1834346424956498,-.525532409916329,.525532409916329,-.7966664774136267,.7966664774136267,-.9602898564975363,.9602898564975363],[0,-.8360311073266358,.8360311073266358,-.9681602395076261,.9681602395076261,-.3242534234038089,.3242534234038089,-.6133714327005904,.6133714327005904],[-.14887433898163122,.14887433898163122,-.4333953941292472,.4333953941292472,-.6794095682990244,.6794095682990244,-.8650633666889845,.8650633666889845,-.9739065285171717,.9739065285171717],[0,-.26954315595234496,.26954315595234496,-.5190961292068118,.5190961292068118,-.7301520055740494,.7301520055740494,-.8870625997680953,.8870625997680953,-.978228658146057,.978228658146057],[-.1252334085114689,.1252334085114689,-.3678314989981802,.3678314989981802,-.5873179542866175,.5873179542866175,-.7699026741943047,.7699026741943047,-.9041172563704749,.9041172563704749,-.9815606342467192,.9815606342467192],[0,-.2304583159551348,.2304583159551348,-.44849275103644687,.44849275103644687,-.6423493394403402,.6423493394403402,-.8015780907333099,.8015780907333099,-.9175983992229779,.9175983992229779,-.9841830547185881,.9841830547185881],[-.10805494870734367,.10805494870734367,-.31911236892788974,.31911236892788974,-.5152486363581541,.5152486363581541,-.6872929048116855,.6872929048116855,-.827201315069765,.827201315069765,-.9284348836635735,.9284348836635735,-.9862838086968123,.9862838086968123],[0,-.20119409399743451,.20119409399743451,-.3941513470775634,.3941513470775634,-.5709721726085388,.5709721726085388,-.7244177313601701,.7244177313601701,-.8482065834104272,.8482065834104272,-.937273392400706,.937273392400706,-.9879925180204854,.9879925180204854],[-.09501250983763744,.09501250983763744,-.2816035507792589,.2816035507792589,-.45801677765722737,.45801677765722737,-.6178762444026438,.6178762444026438,-.755404408355003,.755404408355003,-.8656312023878318,.8656312023878318,-.9445750230732326,.9445750230732326,-.9894009349916499,.9894009349916499],[0,-.17848418149584785,.17848418149584785,-.3512317634538763,.3512317634538763,-.5126905370864769,.5126905370864769,-.6576711592166907,.6576711592166907,-.7815140038968014,.7815140038968014,-.8802391537269859,.8802391537269859,-.9506755217687678,.9506755217687678,-.9905754753144174,.9905754753144174],[-.0847750130417353,.0847750130417353,-.2518862256915055,.2518862256915055,-.41175116146284263,.41175116146284263,-.5597708310739475,.5597708310739475,-.6916870430603532,.6916870430603532,-.8037049589725231,.8037049589725231,-.8926024664975557,.8926024664975557,-.9558239495713977,.9558239495713977,-.9915651684209309,.9915651684209309],[0,-.16035864564022537,.16035864564022537,-.31656409996362983,.31656409996362983,-.46457074137596094,.46457074137596094,-.600545304661681,.600545304661681,-.7209661773352294,.7209661773352294,-.8227146565371428,.8227146565371428,-.9031559036148179,.9031559036148179,-.96020815213483,.96020815213483,-.9924068438435844,.9924068438435844],[-.07652652113349734,.07652652113349734,-.22778585114164507,.22778585114164507,-.37370608871541955,.37370608871541955,-.5108670019508271,.5108670019508271,-.636053680726515,.636053680726515,-.7463319064601508,.7463319064601508,-.8391169718222188,.8391169718222188,-.912234428251326,.912234428251326,-.9639719272779138,.9639719272779138,-.9931285991850949,.9931285991850949],[0,-.1455618541608951,.1455618541608951,-.2880213168024011,.2880213168024011,-.4243421202074388,.4243421202074388,-.5516188358872198,.5516188358872198,-.6671388041974123,.6671388041974123,-.7684399634756779,.7684399634756779,-.8533633645833173,.8533633645833173,-.9200993341504008,.9200993341504008,-.9672268385663063,.9672268385663063,-.9937521706203895,.9937521706203895],[-.06973927331972223,.06973927331972223,-.20786042668822127,.20786042668822127,-.34193582089208424,.34193582089208424,-.469355837986757,.469355837986757,-.5876404035069116,.5876404035069116,-.6944872631866827,.6944872631866827,-.7878168059792081,.7878168059792081,-.8658125777203002,.8658125777203002,-.926956772187174,.926956772187174,-.9700604978354287,.9700604978354287,-.9942945854823992,.9942945854823992],[0,-.1332568242984661,.1332568242984661,-.26413568097034495,.26413568097034495,-.3903010380302908,.3903010380302908,-.5095014778460075,.5095014778460075,-.6196098757636461,.6196098757636461,-.7186613631319502,.7186613631319502,-.8048884016188399,.8048884016188399,-.8767523582704416,.8767523582704416,-.9329710868260161,.9329710868260161,-.9725424712181152,.9725424712181152,-.9947693349975522,.9947693349975522],[-.06405689286260563,.06405689286260563,-.1911188674736163,.1911188674736163,-.3150426796961634,.3150426796961634,-.4337935076260451,.4337935076260451,-.5454214713888396,.5454214713888396,-.6480936519369755,.6480936519369755,-.7401241915785544,.7401241915785544,-.820001985973903,.820001985973903,-.8864155270044011,.8864155270044011,-.9382745520027328,.9382745520027328,-.9747285559713095,.9747285559713095,-.9951872199970213,.9951872199970213]],P=[[],[],[1,1],[.8888888888888888,.5555555555555556,.5555555555555556],[.6521451548625461,.6521451548625461,.34785484513745385,.34785484513745385],[.5688888888888889,.47862867049936647,.47862867049936647,.23692688505618908,.23692688505618908],[.3607615730481386,.3607615730481386,.46791393457269104,.46791393457269104,.17132449237917036,.17132449237917036],[.4179591836734694,.3818300505051189,.3818300505051189,.27970539148927664,.27970539148927664,.1294849661688697,.1294849661688697],[.362683783378362,.362683783378362,.31370664587788727,.31370664587788727,.22238103445337448,.22238103445337448,.10122853629037626,.10122853629037626],[.3302393550012598,.1806481606948574,.1806481606948574,.08127438836157441,.08127438836157441,.31234707704000286,.31234707704000286,.26061069640293544,.26061069640293544],[.29552422471475287,.29552422471475287,.26926671930999635,.26926671930999635,.21908636251598204,.21908636251598204,.1494513491505806,.1494513491505806,.06667134430868814,.06667134430868814],[.2729250867779006,.26280454451024665,.26280454451024665,.23319376459199048,.23319376459199048,.18629021092773426,.18629021092773426,.1255803694649046,.1255803694649046,.05566856711617366,.05566856711617366],[.24914704581340277,.24914704581340277,.2334925365383548,.2334925365383548,.20316742672306592,.20316742672306592,.16007832854334622,.16007832854334622,.10693932599531843,.10693932599531843,.04717533638651183,.04717533638651183],[.2325515532308739,.22628318026289723,.22628318026289723,.2078160475368885,.2078160475368885,.17814598076194574,.17814598076194574,.13887351021978725,.13887351021978725,.09212149983772845,.09212149983772845,.04048400476531588,.04048400476531588],[.2152638534631578,.2152638534631578,.2051984637212956,.2051984637212956,.18553839747793782,.18553839747793782,.15720316715819355,.15720316715819355,.12151857068790319,.12151857068790319,.08015808715976021,.08015808715976021,.03511946033175186,.03511946033175186],[.2025782419255613,.19843148532711158,.19843148532711158,.1861610000155622,.1861610000155622,.16626920581699392,.16626920581699392,.13957067792615432,.13957067792615432,.10715922046717194,.10715922046717194,.07036604748810812,.07036604748810812,.03075324199611727,.03075324199611727],[.1894506104550685,.1894506104550685,.18260341504492358,.18260341504492358,.16915651939500254,.16915651939500254,.14959598881657674,.14959598881657674,.12462897125553388,.12462897125553388,.09515851168249279,.09515851168249279,.062253523938647894,.062253523938647894,.027152459411754096,.027152459411754096],[.17944647035620653,.17656270536699264,.17656270536699264,.16800410215645004,.16800410215645004,.15404576107681028,.15404576107681028,.13513636846852548,.13513636846852548,.11188384719340397,.11188384719340397,.08503614831717918,.08503614831717918,.0554595293739872,.0554595293739872,.02414830286854793,.02414830286854793],[.1691423829631436,.1691423829631436,.16427648374583273,.16427648374583273,.15468467512626524,.15468467512626524,.14064291467065065,.14064291467065065,.12255520671147846,.12255520671147846,.10094204410628717,.10094204410628717,.07642573025488905,.07642573025488905,.0497145488949698,.0497145488949698,.02161601352648331,.02161601352648331],[.1610544498487837,.15896884339395434,.15896884339395434,.15276604206585967,.15276604206585967,.1426067021736066,.1426067021736066,.12875396253933621,.12875396253933621,.11156664554733399,.11156664554733399,.09149002162245,.09149002162245,.06904454273764123,.06904454273764123,.0448142267656996,.0448142267656996,.019461788229726478,.019461788229726478],[.15275338713072584,.15275338713072584,.14917298647260374,.14917298647260374,.14209610931838204,.14209610931838204,.13168863844917664,.13168863844917664,.11819453196151841,.11819453196151841,.10193011981724044,.10193011981724044,.08327674157670475,.08327674157670475,.06267204833410907,.06267204833410907,.04060142980038694,.04060142980038694,.017614007139152118,.017614007139152118],[.14608113364969041,.14452440398997005,.14452440398997005,.13988739479107315,.13988739479107315,.13226893863333747,.13226893863333747,.12183141605372853,.12183141605372853,.10879729916714838,.10879729916714838,.09344442345603386,.09344442345603386,.0761001136283793,.0761001136283793,.057134425426857205,.057134425426857205,.036953789770852494,.036953789770852494,.016017228257774335,.016017228257774335],[.13925187285563198,.13925187285563198,.13654149834601517,.13654149834601517,.13117350478706238,.13117350478706238,.12325237681051242,.12325237681051242,.11293229608053922,.11293229608053922,.10041414444288096,.10041414444288096,.08594160621706773,.08594160621706773,.06979646842452049,.06979646842452049,.052293335152683286,.052293335152683286,.03377490158481415,.03377490158481415,.0146279952982722,.0146279952982722],[.13365457218610619,.1324620394046966,.1324620394046966,.12890572218808216,.12890572218808216,.12304908430672953,.12304908430672953,.11499664022241136,.11499664022241136,.10489209146454141,.10489209146454141,.09291576606003515,.09291576606003515,.07928141177671895,.07928141177671895,.06423242140852585,.06423242140852585,.04803767173108467,.04803767173108467,.030988005856979445,.030988005856979445,.013411859487141771,.013411859487141771],[.12793819534675216,.12793819534675216,.1258374563468283,.1258374563468283,.12167047292780339,.12167047292780339,.1155056680537256,.1155056680537256,.10744427011596563,.10744427011596563,.09761865210411388,.09761865210411388,.08619016153195327,.08619016153195327,.0733464814110803,.0733464814110803,.05929858491543678,.05929858491543678,.04427743881741981,.04427743881741981,.028531388628933663,.028531388628933663,.0123412297999872,.0123412297999872]],_=[[1],[1,1],[1,2,1],[1,3,3,1]],q=function(t,e,n){return{x:(1-n)*(1-n)*(1-n)*t[0]+3*(1-n)*(1-n)*n*t[1]+3*(1-n)*n*n*t[2]+n*n*n*t[3],y:(1-n)*(1-n)*(1-n)*e[0]+3*(1-n)*(1-n)*n*e[1]+3*(1-n)*n*n*e[2]+n*n*n*e[3]}},S=function(t,e,n){return R([3*(t[1]-t[0]),3*(t[2]-t[1]),3*(t[3]-t[2])],[3*(e[1]-e[0]),3*(e[2]-e[1]),3*(e[3]-e[2])],n)},T=function(t,e,n){var i,r,s;i=n/2,r=0;for(var h=0;h<20;h++)s=i*m[20][h]+i,r+=P[20][h]*I(t,e,s);return i*r},R=function(t,e,n){return{x:(1-n)*(1-n)*t[0]+2*(1-n)*n*t[1]+n*n*t[2],y:(1-n)*(1-n)*e[0]+2*(1-n)*n*e[1]+n*n*e[2]}},Z=function(t,e,n){void 0===n&&(n=1);var i=t[0]-2*t[1]+t[2],r=e[0]-2*e[1]+e[2],s=2*t[1]-2*t[0],h=2*e[1]-2*e[0],a=4*(i*i+r*r),o=4*(i*s+r*h),u=s*s+h*h;if(0===a)return n*Math.sqrt(Math.pow(t[2]-t[0],2)+Math.pow(e[2]-e[0],2));var g=o/(2*a),l=n+g,c=u/a-g*g,f=l*l+c>0?Math.sqrt(l*l+c):0,x=g*g+c>0?Math.sqrt(g*g+c):0,p=g+Math.sqrt(g*g+c)!==0?c*Math.log(Math.abs((l+f)/(g+x))):0;return Math.sqrt(a)/2*(l*f-g*x+p)},k=function(t,e,n){return{x:2*(1-n)*(t[1]-t[0])+2*n*(t[2]-t[1]),y:2*(1-n)*(e[1]-e[0])+2*n*(e[2]-e[1])}};function I(t,e,n){var i=C(1,n,t),r=C(1,n,e),s=i*i+r*r;return Math.sqrt(s)}var C=function t(e,n,i){var r,s,h=i.length-1;if(0===h)return 0;if(0===e){s=0;for(var a=0;a<=h;a++)s+=_[h][a]*Math.pow(1-n,h-a)*Math.pow(n,a)*i[a];return s}r=new Array(h);for(var o=0;o<h;o++)r[o]=h*(i[o+1]-i[o]);return t(e-1,n,r)},E=function(t,e,n){for(var i=1,r=t/e,s=(t-n(r))/e,h=0;i>.001;){var a=n(r+s),o=Math.abs(t-a)/e;if(o<i)i=o,r+=s;else{var u=n(r-s),g=Math.abs(t-u)/e;g<i?(i=g,r-=s):s/=2}if(++h>500)break}return r},H=function(t,e,n,i,r,s,h,a){var o=this;u(this,"a",void 0),u(this,"b",void 0),u(this,"c",void 0),u(this,"d",void 0),u(this,"length",void 0),u(this,"getArcLength",void 0),u(this,"getPoint",void 0),u(this,"getDerivative",void 0),u(this,"getTotalLength",(function(){return o.length})),u(this,"getPointAtLength",(function(t){var e=[o.a.x,o.b.x,o.c.x,o.d.x],n=[o.a.y,o.b.y,o.c.y,o.d.y],i=E(t,o.length,(function(t){return o.getArcLength(e,n,t)}));return o.getPoint(e,n,i)})),u(this,"getTangentAtLength",(function(t){var e=[o.a.x,o.b.x,o.c.x,o.d.x],n=[o.a.y,o.b.y,o.c.y,o.d.y],i=E(t,o.length,(function(t){return o.getArcLength(e,n,t)})),r=o.getDerivative(e,n,i),s=Math.sqrt(r.x*r.x+r.y*r.y);return s>0?{x:r.x/s,y:r.y/s}:{x:0,y:0}})),u(this,"getPropertiesAtLength",(function(t){var e,n=[o.a.x,o.b.x,o.c.x,o.d.x],i=[o.a.y,o.b.y,o.c.y,o.d.y],r=E(t,o.length,(function(t){return o.getArcLength(n,i,t)})),s=o.getDerivative(n,i,r),h=Math.sqrt(s.x*s.x+s.y*s.y);e=h>0?{x:s.x/h,y:s.y/h}:{x:0,y:0};var a=o.getPoint(n,i,r);return{x:a.x,y:a.y,tangentX:e.x,tangentY:e.y}})),u(this,"getC",(function(){return o.c})),u(this,"getD",(function(){return o.d})),this.a={x:t,y:e},this.b={x:n,y:i},this.c={x:r,y:s},void 0!==h&&void 0!==a?(this.getArcLength=T,this.getPoint=q,this.getDerivative=S,this.d={x:h,y:a}):(this.getArcLength=Z,this.getPoint=R,this.getDerivative=k,this.d={x:0,y:0}),this.length=this.getArcLength([this.a.x,this.b.x,this.c.x,this.d.x],[this.a.y,this.b.y,this.c.y,this.d.y],1)},z=function(t){var e=this;u(this,"length",0),u(this,"partial_lengths",[]),u(this,"functions",[]),u(this,"initial_point",null),u(this,"getPartAtLength",(function(t){t<0?t=0:t>e.length&&(t=e.length);for(var n=e.partial_lengths.length-1;e.partial_lengths[n]>=t&&n>0;)n--;return n++,{fraction:t-e.partial_lengths[n-1],i:n}})),u(this,"getTotalLength",(function(){return e.length})),u(this,"getPointAtLength",(function(t){var n=e.getPartAtLength(t),i=e.functions[n.i];if(i)return i.getPointAtLength(n.fraction);if(e.initial_point)return e.initial_point;throw new Error("Wrong function at this part.")})),u(this,"getTangentAtLength",(function(t){var n=e.getPartAtLength(t),i=e.functions[n.i];if(i)return i.getTangentAtLength(n.fraction);if(e.initial_point)return{x:0,y:0};throw new Error("Wrong function at this part.")})),u(this,"getPropertiesAtLength",(function(t){var n=e.getPartAtLength(t),i=e.functions[n.i];if(i)return i.getPropertiesAtLength(n.fraction);if(e.initial_point)return{x:e.initial_point.x,y:e.initial_point.y,tangentX:0,tangentY:0};throw new Error("Wrong function at this part.")})),u(this,"getParts",(function(){for(var t=[],n=0;n<e.functions.length;n++)if(null!==e.functions[n]){e.functions[n]=e.functions[n];var i={start:e.functions[n].getPointAtLength(0),end:e.functions[n].getPointAtLength(e.partial_lengths[n]-e.partial_lengths[n-1]),length:e.partial_lengths[n]-e.partial_lengths[n-1],getPointAtLength:e.functions[n].getPointAtLength,getTangentAtLength:e.functions[n].getTangentAtLength,getPropertiesAtLength:e.functions[n].getPropertiesAtLength};t.push(i)}return t}));for(var n,i=Array.isArray(t)?t:function(t){var e=(t&&t.length>0?t:"M0,0").match(f);if(!e)throw new Error("No path elements found in string ".concat(t));return e.reduce((function(t,e){var n=e.charAt(0),i=n.toLowerCase(),r=function(t){var e=t.match(x);return e?e.map(Number):[]}(e.substr(1));for("m"===i&&r.length>2&&(t.push([n].concat(g(r.splice(0,2)))),i="l",n="m"===n?"l":"L");r.length>=0;){if(r.length===c[i]){t.push([n].concat(g(r.splice(0,c[i]))));break}if(r.length<c[i])throw new Error('Malformed path data: "'.concat(n,'" must have ').concat(c[i]," elements and has ").concat(r.length,": ").concat(e));t.push([n].concat(g(r.splice(0,c[i]))))}return t}),[])}(t),r=[0,0],s=[0,0],h=[0,0],a=0;a<i.length;a++){if("M"===i[a][0])h=[(r=[i[a][1],i[a][2]])[0],r[1]],this.functions.push(null),0===a&&(this.initial_point={x:i[a][1],y:i[a][2]});else if("m"===i[a][0])h=[(r=[i[a][1]+r[0],i[a][2]+r[1]])[0],r[1]],this.functions.push(null);else if("L"===i[a][0])this.length+=Math.sqrt(Math.pow(r[0]-i[a][1],2)+Math.pow(r[1]-i[a][2],2)),this.functions.push(new p(r[0],i[a][1],r[1],i[a][2])),r=[i[a][1],i[a][2]];else if("l"===i[a][0])this.length+=Math.sqrt(Math.pow(i[a][1],2)+Math.pow(i[a][2],2)),this.functions.push(new p(r[0],i[a][1]+r[0],r[1],i[a][2]+r[1])),r=[i[a][1]+r[0],i[a][2]+r[1]];else if("H"===i[a][0])this.length+=Math.abs(r[0]-i[a][1]),this.functions.push(new p(r[0],i[a][1],r[1],r[1])),r[0]=i[a][1];else if("h"===i[a][0])this.length+=Math.abs(i[a][1]),this.functions.push(new p(r[0],r[0]+i[a][1],r[1],r[1])),r[0]=i[a][1]+r[0];else if("V"===i[a][0])this.length+=Math.abs(r[1]-i[a][1]),this.functions.push(new p(r[0],r[0],r[1],i[a][1])),r[1]=i[a][1];else if("v"===i[a][0])this.length+=Math.abs(i[a][1]),this.functions.push(new p(r[0],r[0],r[1],r[1]+i[a][1])),r[1]=i[a][1]+r[1];else if("z"===i[a][0]||"Z"===i[a][0])this.length+=Math.sqrt(Math.pow(h[0]-r[0],2)+Math.pow(h[1]-r[1],2)),this.functions.push(new p(r[0],h[0],r[1],h[1])),r=[h[0],h[1]];else if("C"===i[a][0])n=new H(r[0],r[1],i[a][1],i[a][2],i[a][3],i[a][4],i[a][5],i[a][6]),this.length+=n.getTotalLength(),r=[i[a][5],i[a][6]],this.functions.push(n);else if("c"===i[a][0])(n=new H(r[0],r[1],r[0]+i[a][1],r[1]+i[a][2],r[0]+i[a][3],r[1]+i[a][4],r[0]+i[a][5],r[1]+i[a][6])).getTotalLength()>0?(this.length+=n.getTotalLength(),this.functions.push(n),r=[i[a][5]+r[0],i[a][6]+r[1]]):this.functions.push(new p(r[0],r[0],r[1],r[1]));else if("S"===i[a][0]){if(a>0&&["C","c","S","s"].indexOf(i[a-1][0])>-1){if(n){var o=n.getC();n=new H(r[0],r[1],2*r[0]-o.x,2*r[1]-o.y,i[a][1],i[a][2],i[a][3],i[a][4])}}else n=new H(r[0],r[1],r[0],r[1],i[a][1],i[a][2],i[a][3],i[a][4]);n&&(this.length+=n.getTotalLength(),r=[i[a][3],i[a][4]],this.functions.push(n))}else if("s"===i[a][0]){if(a>0&&["C","c","S","s"].indexOf(i[a-1][0])>-1){if(n){var l=n.getC(),d=n.getD();n=new H(r[0],r[1],r[0]+d.x-l.x,r[1]+d.y-l.y,r[0]+i[a][1],r[1]+i[a][2],r[0]+i[a][3],r[1]+i[a][4])}}else n=new H(r[0],r[1],r[0],r[1],r[0]+i[a][1],r[1]+i[a][2],r[0]+i[a][3],r[1]+i[a][4]);n&&(this.length+=n.getTotalLength(),r=[i[a][3]+r[0],i[a][4]+r[1]],this.functions.push(n))}else if("Q"===i[a][0]){if(r[0]==i[a][1]&&r[1]==i[a][2]){var y=new p(i[a][1],i[a][3],i[a][2],i[a][4]);this.length+=y.getTotalLength(),this.functions.push(y)}else n=new H(r[0],r[1],i[a][1],i[a][2],i[a][3],i[a][4],void 0,void 0),this.length+=n.getTotalLength(),this.functions.push(n);r=[i[a][3],i[a][4]],s=[i[a][1],i[a][2]]}else if("q"===i[a][0]){if(0!=i[a][1]||0!=i[a][2])n=new H(r[0],r[1],r[0]+i[a][1],r[1]+i[a][2],r[0]+i[a][3],r[1]+i[a][4],void 0,void 0),this.length+=n.getTotalLength(),this.functions.push(n);else{var A=new p(r[0]+i[a][1],r[0]+i[a][3],r[1]+i[a][2],r[1]+i[a][4]);this.length+=A.getTotalLength(),this.functions.push(A)}s=[r[0]+i[a][1],r[1]+i[a][2]],r=[i[a][3]+r[0],i[a][4]+r[1]]}else if("T"===i[a][0]){if(a>0&&["Q","q","T","t"].indexOf(i[a-1][0])>-1)n=new H(r[0],r[1],2*r[0]-s[0],2*r[1]-s[1],i[a][1],i[a][2],void 0,void 0),this.functions.push(n),this.length+=n.getTotalLength();else{var M=new p(r[0],i[a][1],r[1],i[a][2]);this.functions.push(M),this.length+=M.getTotalLength()}s=[2*r[0]-s[0],2*r[1]-s[1]],r=[i[a][1],i[a][2]]}else if("t"===i[a][0]){if(a>0&&["Q","q","T","t"].indexOf(i[a-1][0])>-1)n=new H(r[0],r[1],2*r[0]-s[0],2*r[1]-s[1],r[0]+i[a][1],r[1]+i[a][2],void 0,void 0),this.length+=n.getTotalLength(),this.functions.push(n);else{var w=new p(r[0],r[0]+i[a][1],r[1],r[1]+i[a][2]);this.length+=w.getTotalLength(),this.functions.push(w)}s=[2*r[0]-s[0],2*r[1]-s[1]],r=[i[a][1]+r[0],i[a][2]+r[1]]}else if("A"===i[a][0]){var L=new v(r[0],r[1],i[a][1],i[a][2],i[a][3],1===i[a][4],1===i[a][5],i[a][6],i[a][7]);this.length+=L.getTotalLength(),r=[i[a][6],i[a][7]],this.functions.push(L)}else if("a"===i[a][0]){var b=new v(r[0],r[1],i[a][1],i[a][2],i[a][3],1===i[a][4],1===i[a][5],r[0]+i[a][6],r[1]+i[a][7]);this.length+=b.getTotalLength(),r=[r[0]+i[a][6],r[1]+i[a][7]],this.functions.push(b)}this.partial_lengths.push(this.length)}},D=function(t){var e=this;if(u(this,"inst",void 0),u(this,"getTotalLength",(function(){return e.inst.getTotalLength()})),u(this,"getPointAtLength",(function(t){return e.inst.getPointAtLength(t)})),u(this,"getTangentAtLength",(function(t){return e.inst.getTangentAtLength(t)})),u(this,"getPropertiesAtLength",(function(t){return e.inst.getPropertiesAtLength(t)})),u(this,"getParts",(function(){return e.inst.getParts()})),this.inst=new z(t),!(this instanceof D))return new D(t)},O={};function j(t,e,n){n=n||2;var i,r,s,h,a,o,u,g=e&&e.length,l=g?e[0]*n:t.length,c=W(t,0,l,n,!0),f=[];if(!c||c.next===c.prev)return f;if(g&&(c=function(t,e,n,i){var r,s,h,a=[];for(r=0,s=e.length;r<s;r++)(h=W(t,e[r]*i,r<s-1?e[r+1]*i:t.length,i,!1))===h.next&&(h.steiner=!0),a.push(J(h));for(a.sort(U),r=0;r<a.length;r++)n=V(a[r],n);return n}(t,e,c,n)),t.length>80*n){i=s=t[0],r=h=t[1];for(var x=n;x<l;x+=n)(a=t[x])<i&&(i=a),(o=t[x+1])<r&&(r=o),a>s&&(s=a),o>h&&(h=o);u=0!==(u=Math.max(s-i,h-r))?32767/u:0}return N(c,f,n,i,r,u,0),f}function W(t,e,n,i,r){var s,h;if(r===lt(t,e,n,i)>0)for(s=e;s<n;s+=i)h=ot(s,t[s],t[s+1],h);else for(s=n-i;s>=e;s-=i)h=ot(s,t[s],t[s+1],h);return h&&nt(h,h.next)&&(ut(h),h=h.next),h}function F(t,e){if(!t)return t;e||(e=t);var n,i=t;do{if(n=!1,i.steiner||!nt(i,i.next)&&0!==et(i.prev,i,i.next))i=i.next;else{if(ut(i),(i=e=i.prev)===i.next)break;n=!0}}while(n||i!==e);return e}function N(t,e,n,i,r,s,h){if(t){!h&&s&&function(t,e,n,i){var r=t;do{0===r.z&&(r.z=B(r.x,r.y,e,n,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next}while(r!==t);r.prevZ.nextZ=null,r.prevZ=null,function(t){var e,n,i,r,s,h,a,o,u=1;do{for(n=t,t=null,s=null,h=0;n;){for(h++,i=n,a=0,e=0;e<u&&(a++,i=i.nextZ);e++);for(o=u;a>0||o>0&&i;)0!==a&&(0===o||!i||n.z<=i.z)?(r=n,n=n.nextZ,a--):(r=i,i=i.nextZ,o--),s?s.nextZ=r:t=r,r.prevZ=s,s=r;n=i}s.nextZ=null,u*=2}while(h>1)}(r)}(t,i,r,s);for(var a,o,u=t;t.prev!==t.next;)if(a=t.prev,o=t.next,s?Y(t,i,r,s):X(t))e.push(a.i/n|0),e.push(t.i/n|0),e.push(o.i/n|0),ut(t),t=o.next,u=o.next;else if((t=o)===u){h?1===h?N(t=$(F(t),e,n),e,n,i,r,s,2):2===h&&Q(t,e,n,i,r,s):N(F(t),e,n,i,r,s,1);break}}}function X(t){var e=t.prev,n=t,i=t.next;if(et(e,n,i)>=0)return!1;for(var r=e.x,s=n.x,h=i.x,a=e.y,o=n.y,u=i.y,g=r<s?r<h?r:h:s<h?s:h,l=a<o?a<u?a:u:o<u?o:u,c=r>s?r>h?r:h:s>h?s:h,f=a>o?a>u?a:u:o>u?o:u,x=i.next;x!==e;){if(x.x>=g&&x.x<=c&&x.y>=l&&x.y<=f&&K(r,a,s,o,h,u,x.x,x.y)&&et(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function Y(t,e,n,i){var r=t.prev,s=t,h=t.next;if(et(r,s,h)>=0)return!1;for(var a=r.x,o=s.x,u=h.x,g=r.y,l=s.y,c=h.y,f=a<o?a<u?a:u:o<u?o:u,x=g<l?g<c?g:c:l<c?l:c,p=a>o?a>u?a:u:o>u?o:u,v=g>l?g>c?g:c:l>c?l:c,d=B(f,x,e,n,i),y=B(p,v,e,n,i),A=t.prevZ,M=t.nextZ;A&&A.z>=d&&M&&M.z<=y;){if(A.x>=f&&A.x<=p&&A.y>=x&&A.y<=v&&A!==r&&A!==h&&K(a,g,o,l,u,c,A.x,A.y)&&et(A.prev,A,A.next)>=0)return!1;if(A=A.prevZ,M.x>=f&&M.x<=p&&M.y>=x&&M.y<=v&&M!==r&&M!==h&&K(a,g,o,l,u,c,M.x,M.y)&&et(M.prev,M,M.next)>=0)return!1;M=M.nextZ}for(;A&&A.z>=d;){if(A.x>=f&&A.x<=p&&A.y>=x&&A.y<=v&&A!==r&&A!==h&&K(a,g,o,l,u,c,A.x,A.y)&&et(A.prev,A,A.next)>=0)return!1;A=A.prevZ}for(;M&&M.z<=y;){if(M.x>=f&&M.x<=p&&M.y>=x&&M.y<=v&&M!==r&&M!==h&&K(a,g,o,l,u,c,M.x,M.y)&&et(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function $(t,e,n){var i=t;do{var r=i.prev,s=i.next.next;!nt(r,s)&&it(r,i,i.next,s)&&ht(r,s)&&ht(s,r)&&(e.push(r.i/n|0),e.push(i.i/n|0),e.push(s.i/n|0),ut(i),ut(i.next),i=t=s),i=i.next}while(i!==t);return F(i)}function Q(t,e,n,i,r,s){var h=t;do{for(var a=h.next.next;a!==h.prev;){if(h.i!==a.i&&tt(h,a)){var o=at(h,a);return h=F(h,h.next),o=F(o,o.next),N(h,e,n,i,r,s,0),void N(o,e,n,i,r,s,0)}a=a.next}h=h.next}while(h!==t)}function U(t,e){return t.x-e.x}function V(t,e){var n=function(t,e){var n,i=e,r=t.x,s=t.y,h=-1/0;do{if(s<=i.y&&s>=i.next.y&&i.next.y!==i.y){var a=i.x+(s-i.y)*(i.next.x-i.x)/(i.next.y-i.y);if(a<=r&&a>h&&(h=a,n=i.x<i.next.x?i:i.next,a===r))return n}i=i.next}while(i!==e);if(!n)return null;var o,u=n,g=n.x,l=n.y,c=1/0;i=n;do{r>=i.x&&i.x>=g&&r!==i.x&&K(s<l?r:h,s,g,l,s<l?h:r,s,i.x,i.y)&&(o=Math.abs(s-i.y)/(r-i.x),ht(i,t)&&(o<c||o===c&&(i.x>n.x||i.x===n.x&&G(n,i)))&&(n=i,c=o)),i=i.next}while(i!==u);return n}(t,e);if(!n)return e;var i=at(n,t);return F(i,i.next),F(n,n.next)}function G(t,e){return et(t.prev,t,e.prev)<0&&et(e.next,t,t.next)<0}function B(t,e,n,i,r){return(t=1431655765&((t=858993459&((t=252645135&((t=16711935&((t=(t-n)*r|0)|t<<8))|t<<4))|t<<2))|t<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-i)*r|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function J(t){var e=t,n=t;do{(e.x<n.x||e.x===n.x&&e.y<n.y)&&(n=e),e=e.next}while(e!==t);return n}function K(t,e,n,i,r,s,h,a){return(r-h)*(e-a)>=(t-h)*(s-a)&&(t-h)*(i-a)>=(n-h)*(e-a)&&(n-h)*(s-a)>=(r-h)*(i-a)}function tt(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!function(t,e){var n=t;do{if(n.i!==t.i&&n.next.i!==t.i&&n.i!==e.i&&n.next.i!==e.i&&it(n,n.next,t,e))return!0;n=n.next}while(n!==t);return!1}(t,e)&&(ht(t,e)&&ht(e,t)&&function(t,e){var n=t,i=!1,r=(t.x+e.x)/2,s=(t.y+e.y)/2;do{n.y>s!=n.next.y>s&&n.next.y!==n.y&&r<(n.next.x-n.x)*(s-n.y)/(n.next.y-n.y)+n.x&&(i=!i),n=n.next}while(n!==t);return i}(t,e)&&(et(t.prev,t,e.prev)||et(t,e.prev,e))||nt(t,e)&&et(t.prev,t,t.next)>0&&et(e.prev,e,e.next)>0)}function et(t,e,n){return(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y)}function nt(t,e){return t.x===e.x&&t.y===e.y}function it(t,e,n,i){var r=st(et(t,e,n)),s=st(et(t,e,i)),h=st(et(n,i,t)),a=st(et(n,i,e));return r!==s&&h!==a||(!(0!==r||!rt(t,n,e))||(!(0!==s||!rt(t,i,e))||(!(0!==h||!rt(n,t,i))||!(0!==a||!rt(n,e,i)))))}function rt(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)}function st(t){return t>0?1:t<0?-1:0}function ht(t,e){return et(t.prev,t,t.next)<0?et(t,e,t.next)>=0&&et(t,t.prev,e)>=0:et(t,e,t.prev)<0||et(t,t.next,e)<0}function at(t,e){var n=new gt(t.i,t.x,t.y),i=new gt(e.i,e.x,e.y),r=t.next,s=e.prev;return t.next=e,e.prev=t,n.next=r,r.prev=n,i.next=n,n.prev=i,s.next=i,i.prev=s,i}function ot(t,e,n,i){var r=new gt(t,e,n);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function ut(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function gt(t,e,n){this.i=t,this.x=e,this.y=n,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function lt(t,e,n,i){for(var r=0,s=e,h=n-i;s<n;s+=i)r+=(t[h]-t[s])*(t[s+1]+t[h+1]),h=s;return r}(O=j).default=j,j.deviation=function(t,e,n,i){var r=e&&e.length,s=r?e[0]*n:t.length,h=Math.abs(lt(t,0,s,n));if(r)for(var a=0,o=e.length;a<o;a++){var u=e[a]*n,g=a<o-1?e[a+1]*n:t.length;h-=Math.abs(lt(t,u,g,n))}var l=0;for(a=0;a<i.length;a+=3){var c=i[a]*n,f=i[a+1]*n,x=i[a+2]*n;l+=Math.abs((t[c]-t[x])*(t[f+1]-t[c+1])-(t[c]-t[f])*(t[x+1]-t[c+1]))}return 0===h&&0===l?0:Math.abs((l-h)/h)},j.flatten=function(t){for(var e=t[0][0].length,n={vertices:[],holes:[],dimensions:e},i=0,r=0;r<t.length;r++){for(var s=0;s<t[r].length;s++)for(var h=0;h<e;h++)n.vertices.push(t[r][s][h]);r>0&&(i+=t[r-1].length,n.holes.push(i))}return n};const ct=t(r("22GsW")).DOMImplementation;self;const ft=new class{background=(0,o.default)();ctx=null;canvasHeight=0;canvasWidth=0;dom=(new ct).createDocument();ratio=2;generator=(0,h.default)();ringSet=[];ringHeights={};sliceSet=[];sliceAngles={};sliceColors={};path=(0,h.default)()({innerRadius:50,outerRadius:300,startAngle:0,endAngle:97*Math.PI/180});poly=[10,0,0,50,60,60,70,10];setContext(t){this.ctx=t}setDimensions(t,e,n){this.canvasWidth=t,this.canvasHeight=e,this.ratio=n}draw(){const{ctx:t,canvasWidth:e,canvasHeight:n,ratio:i,path:r,poly:h}=this;t&&(t.save(),t.clearRect(0,0,Math.floor(e*i),Math.floor(n*i)),t.lineWidth=.75,t.setTransform(i,0,0,i,Math.floor(e*i)/2,Math.floor(n*i)/2),(0,s.select)(this.dom).selectAll("custom.section").each((function(e,n){const i=(0,s.select)(this).select("path"),r=(0,s.select)(this).attr("id"),h=i.attr("fill"),a=(i.attr("opacity"),i.attr("d"));t.strokeStyle="#000000",t.fillStyle=h,t.globalAlpha=.9,a&&t&&!r.includes("_border")&&(t.stroke(new Path2D(a)),t.fill(new Path2D(a)))})),t.globalAlpha=1,t.stroke(),t.restore())}generateArcs(){const{ringSet:t,ringHeights:e,sliceSet:n,sliceColors:i,sliceAngles:r}=this;return n.reduce(((n,s)=>{if(r[s]){const{startAngle:h,endAngle:a}=r[s],o=t.reduce(((t,n,r)=>{if(e[n]){const{innerRadius:o,outerRadius:u}=e[n],g=`_${s}_${n}`,l=i[s],c=l[r%l.length],f={id:g,innerRadius:o,outerRadius:u,startAngle:h,endAngle:a,fill:c},x={id:g+"_border",innerRadius:o+5,outerRadius:u-5,startAngle:h+5*Math.PI/180,endAngle:a-5*Math.PI/180,fill:"black"};t=[...t,f,x]}return t}),[]);n=[...n,...o]}return n}),[])}initChart(t,e,n,i,r){const o=new a;this.sliceColors=r,this.ringSet=t,this.ringHeights=e,this.sliceSet=n,this.sliceAngles=i;const u=n.flatMap(((n,s)=>{const{startAngle:h,endAngle:a}=i[n];return t.map(((t,i)=>{const{innerRadius:s,outerRadius:o}=e[t],u=`_${n}_${t}`,g=r[n],l=g[i%g.length];return{id:u,innerRadius:s,outerRadius:o,startAngle:h,endAngle:a,fill:l}}))}));o.enqueue({type:"sections",input:u}),(0,s.select)(this.dom).call(this.background.queue(o).generator((0,h.default)()).interpolator(s.interpolate).draw((()=>this.draw())))}updateSliceAngles(t){this.sliceAngles=t,this.generateArcs()}updateSliceSet(t,e,n){const{sliceSet:i}=this;if(this.sliceSet=t,this.sliceColors=n,0===i.length){this.sliceAngles=Object.fromEntries(t.map((t=>[t,{startAngle:0,endAngle:0}])));const e={type:"sections",input:this.generateArcs()};this.background.enqueue(e)}this.sliceAngles=e,this.getPathPoints();const r={type:"sections",input:this.generateArcs()};this.background.enqueue(r),this.background.dequeue()}removeSlices(){const{sliceSet:t}=this,e=Object.fromEntries(t.map((t=>[t,{startAngle:2*Math.PI,endAngle:2*Math.PI}])));this.sliceAngles=e;const n={type:"sections",input:this.generateArcs()};this.background.enqueue({type:"duration",input:400}),this.background.enqueue(n),this.sliceSet=[]}updateRingSet(t,e){const{ringSet:n}=this;if(this.ringSet=t,0===n.length){this.background.enqueue({type:"duration",input:400/t.length});const n=Object.fromEntries(t.map((t=>[t,{innerRadius:0,outerRadius:0}])));this.ringHeights=n,this.background.enqueue({type:"sections",input:this.generateArcs()}),t.forEach(((n,i)=>{const r=t.slice(i),{innerRadius:s,outerRadius:h}=e[n];this.ringHeights[n]={innerRadius:s,outerRadius:h},r.forEach((t=>this.ringHeights[t]={innerRadius:s,outerRadius:h}));const a=this.generateArcs();this.background.enqueue({type:"sections",input:a})}))}this.ringHeights=e,this.background.enqueue({type:"sections",input:this.generateArcs()}),this.background.dequeue(),this.getPathPoints()}removeRings(){const{ringSet:t}=this;this.background.enqueue({type:"duration",input:400/t.length}),t.forEach(((e,n)=>{const{outerRadius:i}=this.ringHeights[e];this.ringHeights[e]={innerRadius:i,outerRadius:i};const r=this.generateArcs();this.background.enqueue({type:"sections",input:r}),this.ringSet=t.slice(n),delete this.ringHeights[e]})),this.ringSet=[]}getPathPoints(){const{generator:e}=this,n={},i={};this.generateArcs().forEach((function(r,s){if(r.id.includes("_border")){const s=e(r)||"",h=100,a=[],o=new D(s),u=o.getTotalLength();for(let t=0;t<h;++t){let{x:e,y:n}=o.getPointAtLength(t*u/(h-1));a.push(e),a.push(n)}const g=t(O)(a).reduce(((t,e)=>{const n=2*e;return[...t,[a[n],a[n+1]]]}),[]);i[r.id]=g;const l=[];for(let t=0;t<200;++t){const{startAngle:t,endAngle:e,innerRadius:n,outerRadius:i,id:s}=r;if(s.includes("_border")){const r=Math.random()*(i-n)+n,s=Math.random()*(e-t)+t-Math.PI/2,h=Math.cos(s)*r,a=Math.sin(s)*r;l.push([h,a])}}n[r.id]=l}})),self.postMessage({sectionVerts:i,sectionCoords:n})}};self.addEventListener("message",(t=>{const{type:e,canvas:n,w:i,h:r,r:s,ringSet:h,ringHeights:a,sliceSet:o,sliceAngles:u,sliceColors:g}=t.data;if("set_ctx"===e&&n){const t=n.getContext("2d");ft.setContext(t)}"set_dimensions"===e&&i&&r&&s&&ft.setDimensions(i,r,s),"init_chart"===e&&h&&a&&o&&u&&g&&ft.initChart(h,a,o,u,g),"update_slice_set"===e&&o&&u&&g&&ft.updateSliceSet(o,u,g),"update_ring_set"===e&&h&&a&&ft.updateRingSet(h,a),"remove_rings"===e&&ft.removeRings(),"remove_slices"===e&&ft.removeSlices()}))})();
//# sourceMappingURL=backgroundWorker.061b5c34.js.map
