"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

function useReveal(threshold=0.1){ const ref=useRef(null); const [visible,setVisible]=useState(false); useEffect(()=>{ const el=ref.current; if(!el)return; const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVisible(true);obs.disconnect();}},{threshold}); obs.observe(el); return()=>obs.disconnect(); },[]); return {ref,visible}; }
function Reveal({children,delay=0,dir="up"}){ const {ref,visible}=useReveal(); const t={up:"translateY(28px)"}; return <div ref={ref} style={{opacity:visible?1:0,transform:visible?"none":t[dir]||t.up,transition:`opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`}}>{children}</div>; }
const Label=({text,light})=>(<div style={{display:"inline-flex",alignItems:"center",gap:8,marginBottom:18}}><div style={{width:28,height:2,background:light?"var(--white)":"var(--dark)",borderRadius:2}}/><span style={{fontSize:11,fontWeight:700,color:light?"rgba(255,255,255,0.55)":"var(--text2)",letterSpacing:"2.5px",textTransform:"uppercase"}}>{text}</span></div>);
function CountUp({ target, suffix="", start, duration=1400 }) {
  const [val, setVal] = useState(0);
  useEffect(() => { if (!start) return; let startTime=null;
    const step=(ts)=>{ if(!startTime)startTime=ts; const p=Math.min((ts-startTime)/duration,1); const e=1-Math.pow(1-p,3); setVal(Math.floor(e*target)); if(p<1)requestAnimationFrame(step); else setVal(target); };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return <>{val}{suffix}</>;
}

const SPECIALTIES=[
  {n:"Family Medicine",icon:"🩺"},{n:"Cardiology",icon:"❤️"},{n:"Orthopedics",icon:"🦴"},{n:"Mental Health",icon:"🧠"},
  {n:"Pediatrics",icon:"🧸"},{n:"Dermatology",icon:"🧴"},{n:"Oncology",icon:"🎗️"},{n:"Neurology",icon:"⚡"},
  {n:"Urology",icon:"🔬"},{n:"Gastroenterology",icon:"🩻"},{n:"Ophthalmology",icon:"👁️"},{n:"Radiology",icon:"📷"},
  {n:"Anesthesiology",icon:"💉"},{n:"OB/GYN",icon:"🤱"},{n:"Internal Medicine",icon:"🏥"},{n:"Emergency Medicine",icon:"🚑"},
  {n:"Physical Therapy",icon:"🏃"},{n:"Chiropractic",icon:"🦵"},{n:"Podiatry",icon:"🦶"},{n:"Rheumatology",icon:"🦴"},
  {n:"Endocrinology",icon:"🧪"},{n:"Pulmonology",icon:"🫁"},{n:"Nephrology",icon:"🫘"},{n:"Allergy & Immunology",icon:"🤧"},
  {n:"Infectious Disease",icon:"🦠"},{n:"Sports Medicine",icon:"🏋️"},{n:"Pain Management",icon:"💊"},{n:"Sleep Medicine",icon:"😴"},
  {n:"Vascular Surgery",icon:"🩸"},{n:"General Surgery",icon:"🔪"},{n:"Plastic Surgery",icon:"✨"},{n:"ENT",icon:"👂"},
  {n:"Geriatrics",icon:"👴"},{n:"Hematology",icon:"🩸"},{n:"Psychiatry",icon:"💭"},{n:"Nutrition",icon:"🥗"},
  {n:"Wound Care",icon:"🩹"},{n:"Hospice & Palliative",icon:"🕊️"},{n:"Occupational Medicine",icon:"🏭"},{n:"Bariatric Medicine",icon:"⚖️"},
];
const slugify=(s)=>s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");

export default function SpecialtiesPage(){
  const [search,setSearch]=useState("");
  const [mounted,setMounted]=useState(false);
  const statsReveal=useReveal(0.4);
  useEffect(()=>{ setTimeout(()=>setMounted(true),80); },[]);
  const rise=(d=0)=>({opacity:mounted?1:0,transform:mounted?"translateY(0)":"translateY(28px)",transition:`opacity 0.7s ease ${d}s, transform 0.7s ease ${d}s`});
  const filtered=SPECIALTIES.filter(s=>s.n.toLowerCase().includes(search.toLowerCase()));

  return(
    <>
      <Navbar/>
      <main>
        {/* ══ HERO — new bg image, no grid overlay ══ */}
        <section style={{position:"relative",minHeight:"56vh",display:"flex",alignItems:"center",backgroundImage:"linear-gradient(170deg,rgba(10,10,10,0.82) 15%,rgba(10,10,10,0.55) 60%,rgba(10,10,10,0.35) 100%), url('https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?w=1920&q=85')",backgroundSize:"cover",backgroundPosition:"center",backgroundAttachment:"fixed",padding:"140px 32px 70px"}}>
          <div style={{maxWidth:1200,margin:"0 auto",width:"100%",position:"relative",zIndex:2}}>
            <div style={{...rise(0),display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.1)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.25)",borderRadius:100,padding:"7px 18px",marginBottom:26}}>
              <span style={{width:7,height:7,borderRadius:"50%",background:"var(--white)",animation:"breathe 2s infinite"}}/><span style={{fontSize:12,fontWeight:700,color:"var(--white)",letterSpacing:1.5}}>40+ Specialties Served</span>
            </div>
            <h1 style={{...rise(0.1),fontSize:"clamp(34px,6.5vw,78px)",fontWeight:800,color:"var(--white)",fontFamily:"'Sora',sans-serif",lineHeight:0.98,letterSpacing:"-0.03em",maxWidth:760}}>Billing expertise for every specialty.</h1>
          </div>
        </section>

        {/* ══ ANIMATED STATS BAR ══ */}
        <section ref={statsReveal.ref} style={{background:"var(--cream)",padding:"0",borderBottom:"1px solid rgba(17,17,17,0.06)"}}>
          <div className="stats-thin" style={{maxWidth:1000,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",padding:"8px 20px"}}>
            {[{val:40,suffix:"+",label:"Specialties"},{val:98,suffix:"%+",label:"First-pass rate"},{val:500,suffix:"+",label:"Providers"},{val:50,suffix:"M+",label:"Recovered"}].map((s,i)=>(
              <div key={i} style={{padding:"26px 20px 22px",borderRight:i<3?"1px solid rgba(17,17,17,0.06)":"none",textAlign:"center",opacity:statsReveal.visible?1:0,transform:statsReveal.visible?"translateY(0)":"translateY(14px)",transition:`all 0.6s cubic-bezier(0.16,1,0.3,1) ${i*0.1}s`}}>
                <div style={{fontSize:20,fontWeight:800,color:"var(--dark)",fontFamily:"'Sora',sans-serif",letterSpacing:"-0.04em"}}><CountUp target={s.val} suffix={s.suffix} start={statsReveal.visible} duration={1400+i*150}/></div>
                <div style={{fontSize:10,color:"rgba(17,17,17,0.55)",fontWeight:700,textTransform:"uppercase",letterSpacing:0.75,marginTop:4}}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ SEARCH + ADVANCED ANIMATED CARDS ══ */}
        <section style={{background:"var(--bg)",padding:"60px 32px 100px"}}>
          <div style={{maxWidth:1160,margin:"0 auto"}}>
            <Reveal>
              <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search specialties..." style={{width:"100%",maxWidth:540,display:"block",margin:"0 auto 46px",padding:"17px 26px",border:"1.5px solid var(--border)",borderRadius:100,fontSize:15,outline:"none",fontFamily:"inherit",background:"rgba(255,255,255,0.5)",boxShadow:"0 10px 24px rgba(17,17,17,0.04)"}}/>
            </Reveal>

            <div className="spec-cards-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(0,1fr))",gap:16}}>
              {filtered.map((s,i)=>(
                <Reveal key={s.n} delay={(i%12)*0.025}>
                  <Link href={`/specialties/${slugify(s.n)}`} className="spec-card" style={{
                    display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",
                    position:"relative",background:"var(--white)",border:"1px solid var(--border)",borderRadius:20,
                    padding:"34px 18px",textDecoration:"none",overflow:"hidden",minHeight:150,
                    transition:"all 0.45s cubic-bezier(0.16,1,0.3,1)",
                  }}
                    onMouseEnter={e=>{
                      e.currentTarget.style.transform="translateY(-10px) scale(1.03)";
                      e.currentTarget.style.boxShadow="0 24px 56px rgba(0,0,0,0.14)";
                      e.currentTarget.style.borderColor="var(--dark)";
                      e.currentTarget.style.background="var(--dark)";
                      const bg=e.currentTarget.querySelector(".spec-bg-icon");
                      bg.style.transform="scale(1.55) rotate(-6deg)";
                      bg.style.opacity="0.9";
                      bg.style.filter="grayscale(0) saturate(1.6) drop-shadow(0 0 18px rgba(245,230,163,0.5))";
                      e.currentTarget.querySelector(".spec-name").style.color="#fff";
                      const arr=e.currentTarget.querySelector(".spec-arrow");
                      arr.style.transform="translateX(0)"; arr.style.opacity="1";
                    }}
                    onMouseLeave={e=>{
                      e.currentTarget.style.transform="translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow="none";
                      e.currentTarget.style.borderColor="var(--border)";
                      e.currentTarget.style.background="var(--white)";
                      const bg=e.currentTarget.querySelector(".spec-bg-icon");
                      bg.style.transform="scale(1) rotate(0deg)";
                      bg.style.opacity="0.1";
                      bg.style.filter="grayscale(1) saturate(0.6)";
                      e.currentTarget.querySelector(".spec-name").style.color="var(--dark)";
                      const arr=e.currentTarget.querySelector(".spec-arrow");
                      arr.style.transform="translateX(-6px)"; arr.style.opacity="0";
                    }}>
                    {/* Giant background icon — grayscale by default, bold + colored on hover */}
                    <div className="spec-bg-icon" style={{
                      position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%) scale(1) rotate(0deg)",
                      fontSize:78, opacity:0.1, filter:"grayscale(1) saturate(0.6)",
                      transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)", pointerEvents:"none",
                    }}>{s.icon}</div>

                    <div style={{position:"relative",zIndex:2, animation:`floatIcon 3.5s ease-in-out infinite`, animationDelay:`${(i%8)*0.15}s`}}>
                      <h4 className="spec-name" style={{fontSize:14,fontWeight:800,color:"var(--dark)",fontFamily:"'Sora',sans-serif",lineHeight:1.3,marginBottom:10,transition:"color 0.4s"}}>{s.n}</h4>
                      <span className="spec-arrow" style={{fontSize:11.5,fontWeight:700,color:"var(--yellow)",opacity:0,transform:"translateX(-6px)",transition:"all 0.3s",display:"inline-block"}}>View details →</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ LUXURIOUS CTA ══ */}
        <section style={{background:"var(--dark)",padding:"130px 32px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:"-30%",left:"50%",transform:"translateX(-50%)",width:800,height:800,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,255,255,0.06),transparent 60%)",pointerEvents:"none"}}/>
          <Reveal><div style={{maxWidth:600,margin:"0 auto",textAlign:"center",position:"relative",zIndex:2}}>
            <h2 style={{fontSize:"clamp(28px,5vw,56px)",fontWeight:800,color:"var(--white)",fontFamily:"'Sora',sans-serif",letterSpacing:"-0.03em",marginBottom:24}}>Don't see your specialty?</h2>
            <p style={{fontSize:15,color:"rgba(255,255,255,0.5)",marginBottom:36}}>We bill for practices beyond this list too — reach out and we'll confirm.</p>
            <Link href="/contact" style={{display:"inline-flex",alignItems:"center",gap:10,background:"var(--white)",color:"var(--dark)",padding:"17px 32px",borderRadius:100,fontSize:14.5,fontWeight:800,fontFamily:"'Sora',sans-serif",boxShadow:"0 12px 36px rgba(255,255,255,0.15)"}}>Contact Us →</Link>
          </div></Reveal>
        </section>
      </main>
      <Footer/>
      <style>{`
        @keyframes breathe{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.35;transform:scale(1.5)}}
        @keyframes floatIcon{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
        @media(max-width:900px){.spec-cards-grid{grid-template-columns:repeat(3,minmax(0,1fr)) !important;}.stats-thin{grid-template-columns:repeat(2,minmax(0,1fr)) !important;}}
        @media(max-width:640px){.spec-cards-grid{grid-template-columns:repeat(2,minmax(0,1fr)) !important;}}
      `}</style>
    </>
  );
}