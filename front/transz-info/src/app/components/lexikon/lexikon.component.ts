import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lexikon',
  templateUrl: './lexikon.component.html',
  styleUrls: ['./lexikon.component.scss']
})
export class LexikonComponent implements OnInit {
  entries: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.entries = [
      {
        'letter': 'A',
        'entries': [
          {
            'title': 'Acefóbia',
            'subtitle': '– (Acephobie)',
            'explain': 'Ellenségesség, elutasítás és erőszak az aszexuális emberekkel szemben. A szexualitás valós vagy vélt hiánya miatti megbélyegzés.'
          },
          {
            'title': 'AFAB',
            'subtitle': '– (assigned female at birth)',
            'explain': 'Akit születésekor lánynak határoztak meg. Főleg a cisz nőkre és a transz férfiakra használjuk.'
          },
          {
            'title': 'Agender',
            'explain': 'Olyan személy, aki nem azonosítja magát semmilyen nemi identitással, vagy akinek nincs nemi identitása.'
          },
          {
            'title': 'Androgün',
            'subtitle': 'Androgynous',
            'explain': 'Aki ránézésre és testi adottságai alapján hagyományosan férfi és női nemi jegyekként' +
              ' elkönyvelt adottságokkal is bír; vagy ennek szöges ellentéte: aki sem férfi, sem női meni jegyként' +
              ' elkönyvelt adottsággal sem bír'
          },
          {
            'title': 'Arcfeminizációs műtét',
            'subtitle': '– facial feminisation surgery, FFS',
            'explain': 'Az arcfeminizációs műtét (FFS) a rekonstrukciós sebészeti eljárások egy csoportja, amelyek általában megváltoztatják a férfi arcvonásokat, hogy azok méretükben és alakjukban jobban hasonlítsanak a női arcvonásokhoz. Az FFS számos eljárást magában foglalhat, például szemöldökfelvarrást, orrplasztikát, arcimplantátumokat és ajaknagyobbítást.'
          },
          {
            'title': 'Aroász',
            'subtitle': '– aroace',
            'explain': 'Aromantikus és aszexuális személy vagy az aszexualitás és az aromanticizmus spektrumán tartózkodik.'
          },
          {
            'title': 'Aromantikus',
            'subtitle': '– aro, aromantic',
            'explain': 'Olyan személy, aki nem vagy alig érez romantikus vonzalmat bárki iránt.'
          },
          {
            'title': 'Aszexuális',
            'subtitle': '– ász/ace, asexual',
            'explain': 'Olyan személy, akinek kevés vagy egyáltalán nincs szexuális vonzódása senkihez.'
          },
          {
            'title': 'Aszexuális',
            'subtitle': '– ász/ace, asexual',
            'explain': 'Olyan személy, akinek kevés vagy egyáltalán nincs szexuális vonzódása senkihez.'
          },
        ]
      },
      {
        'letter': 'Á',
        'entries': [
          {
            'title': 'Áldozathibáztatás',
            'subtitle': '- victimblaming',
            'explain': 'Az áldozatot terhelő vagy megszégyenítő cselekedet, ahelyett, hogy az erőszakot okozó személyt hibáztatnák (pl. szoknya volt rajtad, részeg voltál, nem kellett volna megígérned, egyedül voltál kint éjszaka, te kérted, stb.).\n' +
              '\n' +
              'Az áldozathibáztatás a nemi erőszak kultúrájának egyik eszköze.'
          }
        ]
      },
      {
        'letter': 'B',
        'entries': [
          {
            'title': 'Beszédterápia',
            'explain': 'Beszéd- és nyelvi zavarok kezelése, rehabilitációja. A transz emberek beszédterápiával megváltoztathatják beszédmódjukat.'
          },
          {
            'title': 'Binder',
            'subtitle': '– (mellkaskötés)',
            'explain': 'Kompressziós ruha, amely ellapítja a mellkast. A transz férfiak a férfias kinézet fokozására használják.'
          },
          {
            'title': 'Bifóbia',
            'subtitle': '– (biphobia)',
            'explain': 'Ellenségesség, elutasítás és erőszak a biszexuálisokkal, biromantikusokkal és pánokkal szemben.'
          },
          {
            'title': 'Biszexuális',
            'subtitle': '– (bisexual)',
            'explain': 'Olyan személy, aki szexuális vagy romantikus vonzalmat érezhet egynél több nemhez.' +
              'A pánszexuális kifejezés szinonimaként használható.'
          },
          {
            'title': 'Butch',
            'explain': 'Angol kifejezés. Leszbikus nő, akinek megjelenése és viselkedése nagyon férfiasnak számít.'
          },
        ]
      },
      {
        'letter': 'C',
        'entries': [
          {
            'title': 'CAFAB',
            'subtitle': '– coercively assigned female at birth',
            'explain': 'Születéskor kényszerből nőként jelölték ki. Akit az orvosi szakma aktív erőszakoskodása alatt nőnek jelöltek ki. Interszexuális embereknél használatos.'
          },
          {
            'title': 'CAMAB',
            'subtitle': '– coercively assigned male at birth',
            'explain': 'Születésükkor kényszerből férfinak rendelték őket. Akit az orvosok aktív erőszakkal férfivá nyilvánítottak. Interszexuális embereknél használatos.'
          },
          {
            'title': 'Cisznemű, cisz',
            'subtitle': '– cis',
            'explain': 'Olyan személy, aki megfelel a nemi szervei alapján születésekor neki rendelt nemnek. Egy cisz személy nem transz.'
          },
          {
            'title': 'Cisznormatív',
            'subtitle': '– cisnormative',
            'explain': 'Olyan társadalmi rendszerre utal, amelyben az a bevett norma, hogy valakinek ciszneműnek kell lennie; tágabb értelemben minden olyan attitűdre vagy gondolatra utal, amelyet ez a norma kondicionál.'
          },
          {
            'title': 'Ciszpassing',
            'subtitle': '– cispassing',
            'explain': 'A passing azon társadalmi elemek összességére utal, amelyek egy személyt az egyik vagy a másik nemként azonosítanak (vagy egyáltalán nem, ha androgün passingről van szó). A ciszpassing arra utal, hogy egy transz személyt cisz személyként azonosítják.'
          },
          {
            'title': 'Cisz-szexista',
            'subtitle': '– cissexist',
            'explain': 'A cisznemű emberek felsőbbrendűnek tekintése a transznemű emberekhez képest, vagy a cisznemű emberek identitásának legitimebbnek tekintése a transznemű emberek identitásánál, vagy a transzneműség létezésének tagadása. A cisz-szexizmus lehet tudatos vagy tudattalan (az egyének kondicionálása a cisznormatív társadalom által).'
          },
        ]
      },
      {
        'letter': 'D',
        'entries': [
          {
            'title': 'Deadname',
            'explain': 'Születéskor adott keresztnév.'
          },
          {
            'title': 'Dekonstrukció',
            'subtitle': '– (decosntruction)',
            'explain': 'A társadalom által közvetített elnyomó eszmék dekonstruálásának folyamata. A valóságban senkit sem lehet 100%-ban dekonstruálni.'
          },
          {
            'title': 'Dicklit',
            'explain': 'A hormonkezelés következtében megváltozott csikló. Egyes transz férfiak és nem bináris' +
              ' emberek, akár hormonkezelés alatt vannak, akár nem, szintén ezt a kifejezést használják a csiklójukra.'
          },
          {
            'title': 'Diszfória',
            'subtitle': '- dysphoria',
            'explain': 'Kellemetlenség, szorongás vagy elutasítás érzése. A diszfória kapcsolódhat a testhez és/vagy' +
              ' a társadalmi normákhoz. Ezzel az orvosi eredetű kifejezéssel gyakran visszaélnek, mint a transzneműség kritériumával. Egy transz személy azonban nem feltétlenül tapasztal diszfóriát. A diszfóriát azonban olyan helyzetek is kiválthatják, amelyek mások számára ártalmatlannak tűnhetnek.'
          },
        ]
      },
      {
        'letter': 'E',
        'entries': [
          {
            'title': 'Elektrolízis',
            'explain': 'Az elektrolízis egy másik szőrtelenítési módszer, amelyet már több mint 135 éve alkalmaznak.' +
              ' Az elektrolízis alkalmazható szőrtelenítésre, és minden szőrszínre hatásos, ha a megfelelő energiaszinten és a megfelelő technikával alkalmazzák. A kezelés azonban lassú és fárasztó a lézeres szőrtelenítéshez képest (lásd alább).'
          },
          {
            'title': 'Enbifóbia',
            'subtitle': '– (enbyphobia)',
            'explain': 'A transzfóbia egy sajátos formája, amely a nem bináris embereket célozza.'
          },
          {
            'title': 'Endokrinológus',
            'explain': 'Endokrinológiával foglalkozó (hormonokra szakosodott) orvos.'
          },
          {
            'title': 'Esszencializmus',
            'subtitle': '- essentialism',
            'explain': 'Szegregációs ideológia, amely szerint a férfiak és nők "természetüknél fogva" különböző és megváltoztathatatlan tulajdonságokkal, adottságokkal és társadalmi szerepekkel rendelkeznek. Az esszencialista tézist mára érvénytelenítették a legújabb tudományos kutatások, amelyek azt mutatják, hogy az emberi lényekre nem vonatkozik semmilyen biológiai determinizmus.'
          },
          {
            'title': 'Eufória',
            'subtitle': '- euphoria',
            'explain': 'A jólét vagy a kényelem érzése, amely abból fakad, hogy valaki nemének megfelelően érzi magát, vagy nemeként ismerik el, akár szociálisan, akár fizikailag. A nemi eufóriát mindenféle helyzet kiválthatja a transz emberekben.'
          },
        ]
      },
      {
        'letter': 'F',
        'entries': [
          {
            'title': 'Falloplasztika',
            'explain': 'Műtéti beavatkozás (neo)pénisz építésére egy AFAB személynél. A húgycső az alkar bőrének befelé tekeredő részéből alakul ki. A (neo)pénisz a bőr egy másik, kifelé tekeredő részéből épül fel.'
          },{
            'title': 'Femis / Ladyck',
            'explain': 'A hormonkezelés következtében megváltozott pénisz. Néhány transz nő és nem bináris személy,' +
              ' akár hormonkezelés alatt vannak, akár nem, szintén ezt a kifejezést használja a péniszére.'
          },
          {
            'title': 'FtM / Ft* / FtX',
            'subtitle': '– (female-to-male, female-to-nondetermined)',
            'explain': 'female-to-male vagy female-t--*/X. Azokra az AFAB személyekre vonatkozik, akik más neművé' +
              ' válnak. Az FtM a transz férfi szinonimája lehet; az Ft* és FtX utalhat a nem bináris AFAB' +
              ' személyekre is, vagy általánosabban bármely transz AFAB személyre.'
          }
        ]
      },
      {
        'letter': 'G',
        'entries': [
          {
            'title': 'Gay',
            'explain': 'Homoszexuális férfi.'
          },
          {
            'title': 'Genderfluid',
            'explain': 'Olyan személy, akinek a neme körülményektől függően vagy azok nélkül is változhat.'
          },
          {
            'title': 'Gender',
            'explain': 'Társadalmi szerep, pl. férfi vagy nő, és azonosulás a szerepet játszó egyének osztályával. A társadalmi nem nem feltétlenül egyezik meg a születesi nemmel: egy AMAB személy azonosulhat a női szereppel, és így lehet nőnemű.\n' +
              '\n' +
              'A férfi és a női nemek csak nagyon leegyszerűsítő kulturális konvenciók, amelyekkel a' +
              ' személyiségjegyek összetett csoportját címkézik. Minden embernek vannak nőiesnek és férfiasnak tekintett személyiségjegyei. Ezért a nemek sokasága létezik.'
          }
        ]
      },
      {
        'letter': 'H',
        'entries': [
          {
            'title': 'Heteronormativitás',
            'subtitle': '- heteronormativity',
            'explain': 'A hetero létet "normálisnak", magától értetődőnek, alapértelmezett referenciának tekintik, és mindent, ami ettől a normától eltér, marginalizálnak. '
          },
          {
            'title': 'Heteropatriarchia',
            'subtitle': '- heteropatriarchy',
            'explain': 'Esszesszionalista elnyomó társadalmi rendszer, amelyet a heteroszexualitás magától' +
              ' értetődőnek tekintése jellemez. A nők férfiak általi uralmával kapcsolatos. Ez a rendszer a szexizmusra, a rasszizmusra, a validizmusra és az LMBT+-fóbiákra támaszkodik.'
          },
          {
            'title': 'Heteroszexizmus',
            'subtitle': '- heterosexism',
            'explain': 'A heteroszexuális kapcsolatokat előnyben részesítő viselkedések, reprezentációk és' +
              ' diszkriminációk normatív rendszere. A homofóbia, a leszbofóbia, az acefóbia és a bifóbia a' +
              ' heteroszexizmus formái.'
          },
          {
            'title': 'Homofóbia',
            'subtitle': '- homophobia',
            'explain': 'A transz emberek orvosi tranzíciójával összefüggésben a hormonok a hormonpótló terápiára' +
              ' (HRT) utalnak, amelynek célja a testalkat "feminizálása" vagy "maszkulinizálása": progeszteron és ösztrogén a transzfeminin emberek esetében, és tesztoszteron a transzmaszkulin emberek esetében.'
          },
          {
            'title': 'HRT',
            'subtitle': '- hormone replacement therapy',
            'explain': 'Hormonhelyettesítő terápia.'
          },
          {
            'title': 'Hüvelyplasztika',
            'explain': 'Sebészeti műtét, amelynek során a férfi nemi szervből (neo)vaginát és néha (neo)csiklót építenek. Az új nemi szerv, amelyet egy innervált (neo)csikló kísér, funkcionális (kivéve a nemzés szempontjából) és orgazmikus lehet, ha a műtétet jól végzik; esztétikailag nagyon nehéz megkülönböztetni természetes megfelelőjétől. A hüvelyplasztikát általában szeméremajkplasztika kíséri, vagy ugyanazon műtéti eljárás során, vagy egy későbbi műtét során.\n' +
              '\n' +
              'Translated with www.DeepL.com/Translator (free version)'
          }
        ]
      },
      {
        'letter': 'I',
        'entries': [
          {
            'title': 'Interszex',
            'subtitle': '- intersex',
            'explain': 'Az interszex ember egy vagy több olyan biológiai nemi jellegzetességgel rendelkezik, amely nem tekinthető "tipikusan férfinak" vagy "tipikusan nőnek".'
          },
          {
            'title': 'Interszexofóbia',
            'subtitle': '- intersexophobia',
            'explain': 'Az interszexuális és interszexuális emberekkel szembeni ellenségesség, elutasítás. Az' +
              ' interszexofób diskurzus hajlamos az interszexet abnormálsnak állítani, igazolva az' +
              ' interszexuális gyermekeken végzett korai csonkítási műtéteket.'
          }
        ]
      },
      {
        'letter': 'K',
        'entries': [
          {
            'title': 'Kibújás',
            'subtitle': '- coming out',
            'explain': 'Bejelentés egy vagy több embernek, hogy valaki  LMBT+-hoz tartozik. Egy transz személynek' +
              ' életének különböző időszakaiban kell előbújnia, a családjától/barátaitól és a saját helyzetétől függően. Nem tévesztendő össze az "outing"-gal, amely egy személy magánéletének beleegyezése nélküli nyilvánosságra hozatala ismeretleneknek vagy mások számára.'
          }
        ]
      },
      {
        'letter': 'L',
        'entries': [
          {
            'title': 'Leszbikus',
            'subtitle': '- lesbian',
            'explain': 'Homoszexuális nők, vagy bárki, aki a női spektrumon belül a nőkkel kapcsolatban áll, vagy bárki, aki leszbikusnak vallja magát. Azok a transz nők, akik csak nőkhöz vonzódnak, leszbikus nők.'
          },
          {
            'title': 'Labioplasztika',
            'explain': 'Sebészeti, elsősorban esztétikai műtét, amelynek célja a (neo)vagina kisajkakjának felépítése olyan személynél, akin korábban hüvelyplasztikát végeztek. A labioplasztikát, amelyet a vaginoplasztikával egy időben vagy néha néhány hónappal később végeznek, a műtéti technikától függően, általában a Vénusz-hegy és a (neo)klitorisz főkötőjének építése kíséri.'
          },
          {
            'title': 'Lézeres szőrtelenítés',
            'explain': 'Végleges szőrtelenítési folyamat, lézerfényimpulzusok használatával, amelyek elpusztítják a szőrtüszőt. A tüszőnek melanint kell tartalmaznia ahhoz, hogy a fény hővé alakuljon.'
          },
          {
            'title': 'LMBT+',
            'subtitle': '- LGBT+',
            'explain': 'Leszbikus, meleg, biszexuális, transz. A "+" jelzi, hogy a betűszó nem kimerítő, beleértve' +
              ' bármely marginalizált nemi identitást vagy orientációt, mint pl. a queer, interszexuális, aszexuális' +
              ' / aromatikus embereket.'
          },
          {
            'title': 'Lopakodó mód',
            'subtitle': '- shealth',
            'explain': 'Egy transz személyt, aki ciszpassing, és nem fedezik fel, hogy transz, lopakodásnak nevezzük. Gyakran ez az egyetlen módja annak, hogy a transznemű személyek valamennyire békés életet éljenek, és kevésbé legyenek kitéve az erőszaknak.'
          }
        ]
      },
      {
        'letter': 'M',
        'entries': [
          {
            'title': 'Mammektómia',
            'subtitle': '- mammectomy',
            'explain': 'A mellek sebészeti eltávolítása. Szinonimája: masztektómia.'
          },
          {
            'title': 'Metaidoplasztika',
            'explain': 'Sebészeti műtét, amelynek lényege a dicklit felszabadítása és a függesztőszalag átvágása' +
              ' annak érdekében, hogy az végeredmény közelebb álljon a cisz férfiak péniszéhez. A hüvely is' +
              ' lezárható, a' +
              ' húgyvezeték is átépíthető, és a herezacskó is kialakítható, a páciens kívánságaitól függően.'
          },
          {
            'title': 'MtF / Mt* / MtX',
            'subtitle': '- (male-to-female, male-to-nondetermined)',
            'explain': 'Férfiből-nő vagy férfiből-*/X. Azokra az AMAB emberekre vonatkozik, akik más neművé' +
              ' válnak. Az MtF a transz nő szinonimája lehet; az Mt* és MtX utalhat a nem bináris AMAB személyekre is, vagy általánosabban bármely transz AMAB személyre.'
          }
        ]
      },
      {
        'letter': 'N',
        'entries': [
          {
            'title': 'Nemváltó műtét',
            'subtitle': '- SRS, sexual reassignment surgery',
            'explain': 'Általános kifejezés minden olyan műtétre, amelynek célja a külső nemi szervek' +
              ' megváltoztatása, hogy azok a "másik" nemre hasonlítsanak. Az AFAB embereknél falloplasztikára és' +
              ' metaidoiplasztikára, az AMAB embereknél pedig vaginoplasztikára és vulvoplasztikára utal. Nemi' +
              ' diszfória esetén végzik, de messze nem mindenkinél.'
          },
          {
            'title': 'Nem-bináris',
            'subtitle': '- non-binary',
            'explain': 'Olyan személy, aki nem kizárólag férfi vagy kizárólag nő. Ez lehet a nemek kombinációja (egyidejűleg vagy váltakozva), hiánya (agender) vagy egy másik nem. A nem bináris emberek tapasztalatai a transz tapasztalatok közé tartoznak.'
          },
          {
            'title': 'Nemi identitás',
            'subtitle': '- gender identity',
            'explain': 'Az egyén belső nemi érzete, amely független a nemhez rendelt nemtől, a társadalom róluk alkotott véleményétől, megjelenésüktől és nemi kifejeződésüktől.'
          },
          {
            'title': 'Nemi jellegzetességek',
            'subtitle': '- gender characteristics',
            'explain': 'Minden nemi jellemző: hormonok, belső szervek, külső szervek, kromoszómák, mellek, szőrzet, zsíreloszlás stb.'
          },
          {
            'title': 'Nemi kifejezés',
            'subtitle': '- gender expression',
            'explain': 'Egy személy által bemutatott látható és kézzelfogható jellemzők összessége (test, ruházat,' +
              ' smink, parfüm, viselkedés, hang...). A nemi kifejezés eltérhet a nemi identitástól, akár szándékos, akár nem. Nem elegendő egy személy nemének meghatározása.'
          },
          {
            'title': 'Normativitás',
            'subtitle': '- normativity',
            'explain': 'Egy helyzetet normálisnak, magától értetődőnek beállítani, holott az csak egy kulturális elem, amelyet ösztönöznek.'
          },
          {
            'title': 'Nőgyűlölet',
            'subtitle': '- misogyny',
            'explain': 'Ellenszenv vagy megvetés (általában egy férfi részéről) a nőkkel, a női nemmel szemben; a' +
              ' női társadalom kerülésére való hajlam.'
          }
        ]
      },
      {
        'letter': 'O',
        'entries': [
          {
            'title': 'Out',
            'explain': 'Olyan személy, aki bejelentette, hogy transz vagy nem bináris (vagy általában LMBT+).'
          },
          {
            'title': 'Outing',
            'explain': 'Annak felfedése, hogy egy személy transz (vagy LMBTQIA+). Az outing SEMMILYEN esetben sem történhet az érintett személy beleegyezése nélkül. Ez pedig a büntető törvénykönyv szerint a magánélet megsértésének minősülhet.'
          }
        ]
      },
      {
        'letter': 'Ö',
        'entries': [
          {
            'title': 'Önrendelkezés(i jog)',
            'explain': 'Az az elv, hogy minden személynek lehetősége legyen arra, hogy maga válassza meg a saját útját, orvosát, kezeléseit, műtétjeit és intézkedéseit. Más néven "szabad útvonal".'
          }
        ]
      },
      {
        'letter': 'P',
        'entries': [
          {
            'title': 'Packing',
            'explain': 'Minden olyan módszer, amellyel a lágyéknak térfogatot adnak, hogy azt a benyomást keltsék, mintha péniszük lenne. Lehetséges technikák: golyós zokni, péniszprotézisek stb. A kifejezés magára a protézisre is vonatkozik.'
          },
          {
            'title': 'Passing',
            'explain': 'A transz emberek számára ez azt jelenti, hogy a megfelelő nemi identitással rendelkezőnek tekintik őket, anélkül, hogy transz-identitásuk azonosítható lenne. \n' +
              '\n' +
              'A passing lehetővé teszi egyes transz emberek számára, hogy enyhítsék a diszfória érzését, és' +
              ' hozzáférést biztosít bizonyos kiváltságokhoz, amelyek a ciszgender férfi (transz férfiak esetében)' +
              ' vagy ciszgender nő (transz nők esetében) léthez kapcsolódnak.\n' +
              '\n' +
              'Ez lehet túlélési stratégia, vagy az az igény, hogy egy kicsit "normálisabb" életet éljenek.\n'
          }
        ]
      },
      {
        'letter': 'Q',
        'entries': [
          {
            'title': 'Queer',
            'explain': 'Régi sértés (angolul "furcsa, eltorzult"), amelyet a hetero-cisz normákon kívüli politikai követeléseket megfogalmazó emberek sajátítottak ki. Ez a kifejezés ma már tágabb értelemben az LMBT+ közösségre vonatkozik. Az LMBT+ emberek használhatják, akik nem kívánják magukat egy szűkebb kategóriában meghatározni. '
          }
        ]
      },
      {
        'letter': 'S',
        'entries': [
          {
            'title': 'SWERF',
            'subtitle': '- sex worker exclusionary radical feminist',
            'explain': 'Feminista, amely elutasítja a szexmunkások elfogadását.'
          }
        ]
      },
      {
        'letter': 'Sz',
        'entries': [
          {
            'title': 'Szivárvány zászló',
            'subtitle': '- rainbow flag',
            'explain': 'Az 1978-ban létrehozott szivárványszínű zászló neve, amely az LMBTQIA+ büszkeséget szimbolizálja. A zászlónak azóta más, inkluzívabb változatai is készültek.'
          }
        ]
      },
      {
        'letter': 'T',
        'entries': [
          {
            'title': 'TERF',
            'subtitle': '- trans exclusionnary radical feminist',
            'explain': 'Azokra az emberekre utal, akik a feminizmust arra használják, hogy a transzneműek jogai ellen harcoljanak. Tévesen a transzfób emberekre általánosságban használt kifejezés.'
          },
          {
            'title': 'Tojástörés',
            'subtitle': '- cracking the egg',
            'explain': 'A nemi identitás felfedezése/elfogadása.'
          },
          {
            'title': 'Transz / transznemű / transzszexuális',
            'subtitle': '- trans, transgender, transexual',
            'explain': 'Olyan személyre utaló melléknév, aki nem azonosul a születésekor neki rendelt nemmel. A transz, transznemű és transzszexuális kifejezések nagyjából szinonimák, bár az utolsó szót kerülni kell.'
          },
          {
            'title': 'Transzfóbia',
            'subtitle': '- transphobia',
            'explain': 'A transzneműek diszkriminációja/gyűlölete/ellenszenve/elutasítása. A hétköznapi transzfóbia gyakran ártalmatlannak tűnik a cisz emberek számára. Egy személy személyazonosságának semmibe vétele egy példa erre. A transzfóbia lehet internalizált, ami miatt az illető gyűlöli önmagát vagy más transz embereket.'
          },
          {
            'title': 'Transz nő',
            'subtitle': '- trans woman',
            'explain': 'Egy nő, akit születésekor fiúnak jelöltek ki. Nőként hivatkozunk rá.'
          },
          {
            'title': 'Transz férfi',
            'subtitle': '- trans man',
            'explain': 'Egy férfi, akit születésekor nőnek jelöltek ki. Férfiként hivatkozunk rá.'
          },
          {
            'title': 'Tranzíció',
            'subtitle': '- transition',
            'explain': 'Az az időszak, amely alatt a transz személy bizonyos számú cselekedetet hajt végre, hogy' +
              ' mindennapi életét nemi identitásához igazítsa. Az átmenetnek három típusa van: szociális (coming out, ruhatárváltás, stb.), adminisztratív (keresztnévváltás és/vagy hivatalos nemváltás) és orvosi (HRT, beszédterápia, műtétek stb.). Egyetlen transz személyt sem köteleznek az átmenetre, és minden transz személynek meg kell adni a lehetőséget arra, hogy a neki megfelelő egyedi átmenetet végezze el.'
          },
          {
            'title': 'Trigger warning',
            'explain': 'Figyelmeztetés a potenciálisan érzékeny tartalomra, amely traumás visszahívást válthat ki.            Jelzi, hogy a cikk olyan szavakat tartalmaz vagy olyan témákat tárgyal, amelyek egyeseket kellemetlenül érinthetnek, diszfóriát válthatnak ki, vagy traumát idézhetnek fel.'
          },
          {
            'title': 'Tucking',
            'explain': 'A "pénisz behúzása" néven ismert módszer, amikor a heréket felhúzzák a hasüregbe, hogy elrejtsék a pénisz és a herék dudorodását.\n' +
              '\n' +
              'Egyes transzfeminin emberek és balett-táncosok gyakorolják. Ezenkívül a tuckingot a fogamzásgátlás egyik formájaként használják, mivel felmelegíti a heréket, és így csökkenti a termékenységet. '
          },
        ]
      }

    ];
  }

}
