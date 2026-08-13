"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

function useReveal(threshold=0.1){
  const ref=useRef(null); const [visible,setVisible]=useState(false);
  useEffect(()=>{ const el=ref.current; if(!el)return; const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVisible(true);obs.disconnect();}},{threshold}); obs.observe(el); return()=>obs.disconnect(); },[]);
  return {ref,visible};
}
function Reveal({children,delay=0,dir="up"}){
  const {ref,visible}=useReveal();
  const t={up:"translateY(36px)",left:"translateX(-36px)",right:"translateX(36px)",scale:"scale(0.93)"};
  return <div ref={ref} style={{opacity:visible?1:0,transform:visible?"none":t[dir],transition:`opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`}}>{children}</div>;
}
const Label=({text,light})=>(
  <div style={{display:"inline-flex",alignItems:"center",gap:8,marginBottom:18}}>
    <div style={{width:28,height:2,background:light?"var(--yellow)":"var(--dark)",borderRadius:2}}/>
    <span style={{fontSize:11,fontWeight:700,color:light?"rgba(255,255,255,0.55)":"var(--text2)",letterSpacing:"2.5px",textTransform:"uppercase"}}>{text}</span>
  </div>
);
function CountUp({ target, suffix="", prefix="", duration=1600, start, decimals=0 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else setVal(target);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return <>{prefix}{decimals>0?val.toFixed(decimals):Math.floor(val)}{suffix}</>;
}

const REVIEWS=[
  {name:"Dr. Sarah Mitchell",role:"Family Medicine",text:"MedCare reduced our AR days from 52 to 24 in 60 days. Collections improved by 31%.",rating:5,avatar:"S",img:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80"},
  {name:"Dr. James Chen",role:"Multi-specialty Group",text:"Saved $18K/month in overhead switching from in-house billing. Denial management is exceptional.",rating:5,avatar:"J",img:"https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80"},
  {name:"Dr. Priya Nair",role:"Cardiology Practice",text:"Got us enrolled with 8 new payers in under 90 days. Zero disruption during transition.",rating:5,avatar:"P",img:"https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80"},
  {name:"Dr. Marcus Webb",role:"Orthopedic Surgery",text:"First-pass rate went from 78% to 97%. The monthly reporting is genuinely useful, not just numbers.",rating:5,avatar:"M",img:"https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&q=80"},
  {name:"Dr. Linda Torres",role:"Pediatrics",text:"Onboarding took exactly 6 days as promised. Our billing team transition was seamless.",rating:5,avatar:"L",img:"https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=200&q=80"},
  {name:"Dr. Kevin Park",role:"Dermatology",text:"Appeal success rate is incredible. We've recovered claims we'd written off years ago.",rating:5,avatar:"K",img:"https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=200&q=80"},
  {name:"Dr. Angela Reyes",role:"Mental Health Practice",text:"Patient billing improved dramatically. Fewer complaints, faster payments, happier patients.",rating:5,avatar:"A",img:"https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=200&q=80"},
  {name:"Dr. Thomas Nguyen",role:"Internal Medicine",text:"The live KPI dashboard changed how we run our practice financially. Total transparency.",rating:5,avatar:"T",img:"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80"},
  {name:"Dr. Emily Foster",role:"Gastroenterology",text:"Credentialing team is fast and thorough. Never had a lapse in 2 years working with them.",rating:5,avatar:"E",img:"https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80"},
  {name:"Dr. Robert Hayes",role:"Urology Practice",text:"Switched three years ago and never looked back. Revenue up, stress down.",rating:5,avatar:"R",img:"https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&q=80"},
  {name:"Dr. Nina Patel",role:"Ophthalmology",text:"Their coding accuracy caught issues our previous billing company missed for years.",rating:5,avatar:"N",img:"https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=200&q=80"},
  {name:"Dr. David Kim",role:"Radiology Group",text:"Professional, responsive, and genuinely invested in our practice's financial health.",rating:5,avatar:"D",img:"https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80"},
];
const STATS=[
  {val:4.9,label:"Average rating",decimals:1,suffix:"/5"},
  {val:500,label:"Providers",suffix:"+"},
  {val:98,label:"Satisfaction",suffix:"%"},
  {val:31,label:"Avg. increase",suffix:"%"},
];

export default function TestimonialsPage(){
  const [mounted,setMounted]=useState(false);
  const statsReveal=useReveal(0.4);
  useEffect(()=>{ setTimeout(()=>setMounted(true),80); },[]);
  const rise=(d=0)=>({opacity:mounted?1:0,transform:mounted?"translateY(0)":"translateY(32px)",transition:`opacity 0.8s ease ${d}s, transform 0.8s ease ${d}s`});

  return(
    <>
      <Navbar/>
      <main>
        {/* ══ HERO — fixed bg ══ */}
        <section style={{
          position:"relative", minHeight:"86vh", display:"flex", alignItems:"center",
          backgroundImage:"linear-gradient(170deg,rgba(10,10,10,0.85) 15%,rgba(10,10,10,0.6) 55%,rgba(10,10,10,0.4) 100%), url('https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1920&q=85')",
          backgroundSize:"cover", backgroundPosition:"center", backgroundAttachment:"fixed",
          padding:"140px 32px 70px",
        }}>
          <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",backgroundSize:"56px 56px",pointerEvents:"none"}}/>
          {/* floating giant quote mark */}
          <div style={{position:"absolute",top:"12%",right:"8%",fontSize:220,color:"rgba(245,230,163,0.07)",fontFamily:"'Syne',sans-serif",fontWeight:800,animation:"floatQuote 8s ease-in-out infinite",willChange:"transform",pointerEvents:"none",lineHeight:1}}>&ldquo;</div>

          <div style={{maxWidth:1200,margin:"0 auto",width:"100%",position:"relative",zIndex:2}}>
            <div style={{...rise(0),display:"inline-flex",alignItems:"center",gap:8,background:"rgba(245,230,163,0.15)",backdropFilter:"blur(8px)",border:"1px solid rgba(245,230,163,0.3)",borderRadius:100,padding:"7px 18px",marginBottom:28}}>
              <span style={{width:7,height:7,borderRadius:"50%",background:"var(--yellow)",animation:"breathe 2s infinite"}}/>
              <span style={{fontSize:12,fontWeight:700,color:"var(--yellow)",letterSpacing:1.5}}>Client Testimonials</span>
            </div>
            <h1 style={{...rise(0.12),fontSize:"clamp(38px,7vw,88px)",fontWeight:800,color:"var(--white)",fontFamily:"'Syne',sans-serif",lineHeight:0.96,letterSpacing:"-0.03em",marginBottom:26,maxWidth:820}}>
              What 500+ providers<br/>say about us<span style={{color:"var(--yellow)"}}>.</span>
            </h1>
            <p style={{...rise(0.22),fontSize:17,color:"rgba(255,255,255,0.72)",lineHeight:1.85,maxWidth:520}}>
              Real results, in their own words — from independent practices to multi-specialty groups nationwide.
            </p>

            {/* Avatar stack */}
            <div style={{...rise(0.32),display:"flex",alignItems:"center",gap:16,marginTop:40}}>
              <div style={{display:"flex"}}>
                {REVIEWS.slice(0,5).map((r,i)=>(
                  <img key={i} src={r.img} alt={r.name} loading="lazy" style={{width:44,height:44,borderRadius:"50%",objectFit:"cover",border:"2.5px solid var(--dark)",marginLeft:i>0?-14:0,boxShadow:"0 4px 12px rgba(0,0,0,0.3)"}}/>
                ))}
              </div>
              <div>
                <div style={{display:"flex",gap:2,marginBottom:2}}>{[...Array(5)].map((_,j)=><span key={j} style={{fontSize:13,color:"#F59E0B"}}>★</span>)}</div>
                <div style={{fontSize:12.5,color:"rgba(255,255,255,0.6)",fontWeight:600}}>Trusted by 500+ healthcare providers</div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ THIN ANIMATED STATS BAR ══ */}
        <section ref={statsReveal.ref} style={{background:"var(--dark)",padding:"0",overflow:"hidden",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
          <div className="stats-thin" style={{maxWidth:1000,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)"}}>
            {STATS.map((s,i)=>(
              <div key={i} style={{padding:"18px 20px",borderRight:i<3?"1px solid rgba(255,255,255,0.06)":"none",textAlign:"center",opacity:statsReveal.visible?1:0,transform:statsReveal.visible?"translateY(0)":"translateY(14px)",transition:`all 0.6s cubic-bezier(0.16,1,0.3,1) ${i*0.1}s`}}>
                <div style={{fontSize:20,fontWeight:800,color:"var(--yellow)",fontFamily:"'Syne',sans-serif",letterSpacing:"-0.02em"}}>
                  <CountUp target={s.val} suffix={s.suffix} decimals={s.decimals||0} start={statsReveal.visible} duration={1400+i*150}/>
                </div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.35)",fontWeight:600,textTransform:"uppercase",letterSpacing:0.6,marginTop:2}}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ REVIEWS GRID ══ */}
        <section style={{background:"var(--bg)",padding:"100px 32px"}}>
          <div style={{maxWidth:1200,margin:"0 auto"}}>
            <div className="reviews-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}}>
              {REVIEWS.map((t,i)=>(
                <Reveal key={i} delay={(i%6)*0.06}>
                  <div style={{background:"var(--white)",border:"1px solid var(--border)",borderRadius:22,padding:"26px",boxShadow:"var(--shadow)",height:"100%",transition:"all 0.3s"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 16px 40px rgba(0,0,0,0.08)";}} onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="var(--shadow)";}}>
                    <div style={{display:"flex",gap:2,marginBottom:14}}>{[...Array(t.rating)].map((_,j)=><span key={j} style={{fontSize:13,color:"#F59E0B"}}>★</span>)}</div>
                    <p style={{fontSize:14,color:"var(--text2)",lineHeight:1.75,marginBottom:20}}>&ldquo;{t.text}&rdquo;</p>
                    <div style={{display:"flex",alignItems:"center",gap:10,paddingTop:16,borderTop:"1px solid var(--border)"}}>
                      <img src={t.img} alt={t.name} loading="lazy" style={{width:36,height:36,borderRadius:"50%",objectFit:"cover",flexShrink:0}}/>
                      <div><div style={{fontSize:13,fontWeight:800,color:"var(--dark)",fontFamily:"'Syne',sans-serif"}}>{t.name}</div><div style={{fontSize:11,color:"var(--text3)"}}>{t.role}</div></div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA — different from all others: split panel w/ giant stat + form ══ */}
        <section style={{background:"var(--white)",padding:"0",position:"relative",overflow:"hidden"}}>
          <div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",minHeight:520}} className="cta-split">
            {/* Left — dark panel with giant animated number */}
            <Reveal dir="left">
              <div style={{background:"var(--black)",height:"100%",padding:"70px 56px",display:"flex",flexDirection:"column",justifyContent:"center",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:-100,left:-100,width:340,height:340,borderRadius:"50%",background:"radial-gradient(circle,rgba(245,230,163,0.12),transparent 70%)",pointerEvents:"none"}}/>
                <Label text="Join Them" light/>
                <div style={{fontSize:"clamp(72px,9vw,140px)",fontWeight:800,color:"var(--yellow)",fontFamily:"'Syne',sans-serif",letterSpacing:"-0.05em",lineHeight:0.85,marginBottom:8}}>
                  <CountUp target={31} suffix="%" start={mounted} duration={1800}/>
                </div>
                <p style={{fontSize:16,color:"rgba(255,255,255,0.55)",lineHeight:1.7,maxWidth:340}}>average collections increase reported by MedCare RCM clients within their first 90 days.</p>
              </div>
            </Reveal>
            {/* Right — light panel with headline + CTA */}
            <Reveal dir="right">
              <div style={{background:"var(--bg)",height:"100%",padding:"70px 56px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
                <h2 style={{fontSize:"clamp(26px,3.5vw,42px)",fontWeight:800,color:"var(--dark)",fontFamily:"'Syne',sans-serif",letterSpacing:"-0.03em",lineHeight:1.1,marginBottom:20}}>
                  Become our next success story.
                </h2>
                <p style={{fontSize:15,color:"var(--text2)",lineHeight:1.8,marginBottom:32,maxWidth:400}}>
                  Get a free billing audit and see exactly what MedCare RCM could recover for your practice — no obligation, no pressure.
                </p>
                <div>
                  <Link href="/contact" style={{display:"inline-flex",alignItems:"center",gap:10,background:"var(--dark)",color:"var(--black)",padding:"17px 32px",borderRadius:100,fontSize:15,fontWeight:800,fontFamily:"'Syne',sans-serif",boxShadow:"0 10px 30px rgba(10,10,10,0.18)",transition:"transform 0.3s,box-shadow 0.3s"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 16px 40px rgba(10,10,10,0.26)";}} onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 10px 30px rgba(10,10,10,0.18)";}}>
                    Get Free Audit →
                  </Link>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:10,marginTop:28}}>
                  <div style={{display:"flex"}}>
                    {REVIEWS.slice(5,9).map((r,i)=>(<img key={i} src={r.img} alt={r.name} loading="lazy" style={{width:32,height:32,borderRadius:"50%",objectFit:"cover",border:"2px solid var(--bg)",marginLeft:i>0?-10:0}}/>))}
                  </div>
                  <span style={{fontSize:12,color:"var(--text3)",fontWeight:600}}>Join 500+ providers already onboard</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer/>
      <style>{`
        @keyframes breathe{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.35;transform:scale(1.5)}}
        @keyframes floatQuote{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-16px) rotate(3deg)}}
        @media(max-width:768px){.stats-thin{grid-template-columns:1fr 1fr !important;}.reviews-grid{grid-template-columns:1fr 1fr !important;}.cta-split{grid-template-columns:1fr !important;}}
        @media(max-width:480px){.reviews-grid{grid-template-columns:1fr !important;}}
      `}</style>
    </>
  );
}
