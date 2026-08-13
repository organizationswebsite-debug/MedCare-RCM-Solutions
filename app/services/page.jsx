"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

function useReveal(threshold=0.1){ const ref=useRef(null); const [visible,setVisible]=useState(false); useEffect(()=>{ const el=ref.current; if(!el)return; const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVisible(true);obs.disconnect();}},{threshold}); obs.observe(el); return()=>obs.disconnect(); },[]); return {ref,visible}; }
function Reveal({children,delay=0,dir="up"}){ const {ref,visible}=useReveal(); const t={up:"translateY(32px)",left:"translateX(-32px)",right:"translateX(32px)",scale:"scale(0.94)"}; return <div ref={ref} style={{opacity:visible?1:0,transform:visible?"none":t[dir],transition:`opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`}}>{children}</div>; }
const Label=({text,light})=>(<div style={{display:"inline-flex",alignItems:"center",gap:8,marginBottom:18}}><div style={{width:28,height:2,background:light?"var(--yellow)":"var(--dark)",borderRadius:2}}/><span style={{fontSize:11,fontWeight:700,color:light?"rgba(255,255,255,0.55)":"var(--text2)",letterSpacing:"2.5px",textTransform:"uppercase"}}>{text}</span></div>);
function CountUp({ target, suffix="", prefix="", duration=1500, start }) {
  const [val, setVal] = useState(0);
  useEffect(() => { if (!start) return; let startTime=null;
    const step=(ts)=>{ if(!startTime)startTime=ts; const p=Math.min((ts-startTime)/duration,1); const e=1-Math.pow(1-p,3); setVal(Math.floor(e*target)); if(p<1)requestAnimationFrame(step); else setVal(target); };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return <>{prefix}{val}{suffix}</>;
}

const SERVICES=[
  {icon:"🧾",title:"Medical Billing",desc:"98%+ first-pass rate. Certified specialists handle every claim from charge entry to payment.",slug:"medical-billing",num:"01",stat:"98%+",statLabel:"First-pass rate",tags:["Charge Capture","Coding","Submission"]},
  {icon:"💰",title:"Revenue Cycle Management",desc:"End-to-end RCM covering all 10 steps from scheduling to final payment.",slug:"revenue-cycle-management",num:"02",stat:"$50M+",statLabel:"Recovered",tags:["Scheduling","Eligibility","Reporting"]},
  {icon:"🏥",title:"Hospital Billing",desc:"DRG bundling, facility coding, multi-departmental charge capture for hospitals.",slug:"hospital-billing",num:"03",stat:"65%",statLabel:"Denial reduction",tags:["DRG","Facility Coding","UB-04"]},
  {icon:"👨‍⚕️",title:"Physician Billing",desc:"E&M coding, modifier compliance for private practices and multi-specialty groups.",slug:"physician-billing",num:"04",stat:"40%",statLabel:"Admin time saved",tags:["E&M Coding","Modifiers","Eligibility"]},
  {icon:"🧪",title:"Laboratory Billing",desc:"PAMA-compliant billing for molecular, pathology, and toxicology labs.",slug:"laboratory-billing",num:"05",stat:"100%",statLabel:"PAMA compliance",tags:["Panel Billing","Prior Auth","Toxicology"]},
  {icon:"📸",title:"Imaging Billing",desc:"Professional and technical component billing for diagnostic imaging centers.",slug:"imaging-billing",num:"06",stat:"0%",statLabel:"Downcoding loss",tags:["MRI/CT","Modifier 26/TC","LCD Review"]},
  {icon:"💵",title:"AR Recovery",desc:"Systematic recovery of aging claims beyond 60 days. $50M+ recovered.",slug:"ar-recovery",num:"07",stat:"70%+",statLabel:"Appeal success",tags:["Aging Claims","Escalation","Appeals"]},
  {icon:"🪪",title:"Provider Credentialing",desc:"CAQH setup, payer enrollment. Zero credentialing lapses guaranteed.",slug:"credentialing",num:"08",stat:"0",statLabel:"Lapses",tags:["CAQH","Medicare","Commercial Payers"]},
  {icon:"🏨",title:"ASC Billing",desc:"Specialized billing for ambulatory surgery centers and facility fees.",slug:"asc-billing",num:"09",stat:"100%",statLabel:"Implant cost capture",tags:["Facility Fees","Implants","Modifier SG"]},
  {icon:"🚫",title:"Denial Management",desc:"70%+ appeal success rate. Every denial worked within 48 hours.",slug:"denial-management",num:"10",stat:"48hr",statLabel:"Turnaround",tags:["Root Cause","Appeals","Trend Analysis"]},
  {icon:"👤",title:"Patient Billing",desc:"Clear statements, online payment portal, compassionate collections.",slug:"patient-billing",num:"11",stat:"30%",statLabel:"Collections increase",tags:["Statements","Payment Portal","Payment Plans"]},
  {icon:"📊",title:"Reporting & Analytics",desc:"Live KPI dashboards updated in real-time across 50+ metrics.",slug:"reporting-analytics",num:"12",stat:"50+",statLabel:"KPIs tracked",tags:["Live Dashboard","Benchmarking","Custom Reports"]},
];

export default function ServicesPage(){
  const [mounted,setMounted]=useState(false);
  const [activeIdx,setActiveIdx]=useState(0);
  const [hoverIdx,setHoverIdx]=useState(null);
  const statsReveal=useReveal(0.4);
  useEffect(()=>{ setTimeout(()=>setMounted(true),80); },[]);
  const rise=(d=0)=>({opacity:mounted?1:0,transform:mounted?"translateY(0)":"translateY(28px)",transition:`opacity 0.7s ease ${d}s, transform 0.7s ease ${d}s`});

  return(
    <>
      <Navbar/>
      <main>
        {/* ══ HERO — fixed bg ══ */}
        <section style={{
          position:"relative", minHeight:"86vh", display:"flex", alignItems:"center",
          backgroundImage:"linear-gradient(170deg,rgba(17,17,17,0.85) 15%,rgba(17,17,17,0.6) 55%,rgba(17,17,17,0.4) 100%), url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=85')",
          backgroundSize:"cover", backgroundPosition:"center", backgroundAttachment:"fixed",
          padding:"140px 32px 70px",
        }}>
          <div style={{position:"absolute",top:"18%",right:"10%",width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,rgba(245,230,163,0.2),transparent 70%)",animation:"floatBlob 8s ease-in-out infinite",willChange:"transform",pointerEvents:"none"}}/>

          <div style={{maxWidth:1200,margin:"0 auto",width:"100%",position:"relative",zIndex:2}}>
            <div style={{...rise(0),display:"inline-flex",alignItems:"center",gap:8,background:"rgba(245,230,163,0.15)",backdropFilter:"blur(8px)",border:"1px solid rgba(245,230,163,0.3)",borderRadius:100,padding:"7px 18px",marginBottom:28}}>
              <span style={{width:7,height:7,borderRadius:"50%",background:"var(--yellow)",animation:"breathe 2s infinite"}}/>
              <span style={{fontSize:12,fontWeight:700,color:"var(--yellow)",letterSpacing:1.5}}>12 Full-Service Solutions</span>
            </div>
            <h1 style={{...rise(0.1),fontSize:"clamp(40px,7.5vw,92px)",fontWeight:800,color:"#fff",lineHeight:0.96,letterSpacing:"-0.02em",maxWidth:800,marginBottom:26}}>Every service your revenue cycle needs.</h1>
            <p style={{...rise(0.2),fontSize:17,color:"rgba(255,255,255,0.72)",lineHeight:1.85,maxWidth:520}}>From charge capture to final payment — one integrated team handling every step, for 40+ specialties nationwide.</p>
          </div>
        </section>

        {/* ══ ANIMATED STATS BAR ══ */}
        <section ref={statsReveal.ref} style={{background:"var(--dark)",padding:"0",overflow:"hidden",borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
          <div className="stats-thin" style={{maxWidth:1000,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)"}}>
            {[{val:12,label:"Services"},{val:98,suffix:"%+",label:"First-pass rate"},{val:500,suffix:"+",label:"Providers"},{val:40,suffix:"+",label:"Specialties"}].map((s,i)=>(
              <div key={i} style={{padding:"18px 20px",borderRight:i<3?"1px solid rgba(255,255,255,0.06)":"none",textAlign:"center",opacity:statsReveal.visible?1:0,transform:statsReveal.visible?"translateY(0)":"translateY(14px)",transition:`all 0.6s cubic-bezier(0.16,1,0.3,1) ${i*0.1}s`}}>
                <div style={{fontSize:20,fontWeight:800,color:"var(--yellow)"}}><CountUp target={s.val} suffix={s.suffix||""} start={statsReveal.visible} duration={1400+i*150}/></div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.35)",fontWeight:600,textTransform:"uppercase",letterSpacing:0.6,marginTop:2}}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ INTERACTIVE SHOWCASE — desktop ══ */}
        <section style={{background:"var(--bg)",padding:"100px 32px"}}>
          <div style={{maxWidth:1160,margin:"0 auto"}}>
            <Reveal><div style={{textAlign:"center",marginBottom:56}}><Label text="Explore Our Services"/><h2 style={{fontSize:"clamp(26px,4vw,44px)",fontWeight:800,color:"var(--dark)",letterSpacing:"-0.02em"}}>Hover to preview, click to explore</h2></div></Reveal>

            <Reveal delay={0.08}>
              <div className="showcase-grid" style={{display:"grid",gridTemplateColumns:"0.9fr 1.1fr",gap:0,background:"#fff",borderRadius:32,overflow:"hidden",border:"1px solid var(--border)",boxShadow:"var(--shadow-lg)",minHeight:560,position:"relative"}}>

                <div style={{borderRight:"1px solid var(--border)",maxHeight:600,overflowY:"auto"}} className="showcase-list">
                  {SERVICES.map((s,i)=>(
                    <button key={i} onClick={()=>setActiveIdx(i)} onMouseEnter={()=>{setActiveIdx(i);setHoverIdx(i);}} onMouseLeave={()=>setHoverIdx(null)}
                      style={{
                        width:"100%",textAlign:"left",background:activeIdx===i?"var(--dark)":"transparent",
                        border:"none",borderBottom:"1px solid var(--border)",padding:"20px 26px",cursor:"pointer",
                        display:"flex",alignItems:"center",gap:14,transition:"background 0.35s cubic-bezier(0.16,1,0.3,1)",
                        position:"relative", overflow:"hidden",
                      }}>
                      {/* sliding active indicator */}
                      <div style={{position:"absolute",left:0,top:0,bottom:0,width:4,background:"var(--yellow)",transform:activeIdx===i?"scaleY(1)":"scaleY(0)",transformOrigin:"center",transition:"transform 0.35s cubic-bezier(0.34,1.56,0.64,1)"}}/>
                      <span style={{fontSize:10.5,fontWeight:800,color:activeIdx===i?"var(--yellow)":"var(--text3)",width:18,flexShrink:0,transition:"color 0.3s"}}>{s.num}</span>
                      <span style={{fontSize:22,flexShrink:0,transform:hoverIdx===i?"scale(1.2) rotate(-8deg)":"scale(1) rotate(0deg)",transition:"transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",display:"inline-block"}}>{s.icon}</span>
                      <span style={{fontSize:14.5,fontWeight:700,color:activeIdx===i?"#fff":"var(--dark)",flex:1,transition:"color 0.3s"}}>{s.title}</span>
                      <span style={{fontSize:16,color:"var(--yellow)",transform:activeIdx===i?"translateX(0)":"translateX(-8px)",opacity:activeIdx===i?1:0,transition:"all 0.3s"}}>→</span>
                    </button>
                  ))}
                </div>

                {/* Right — animated preview panel */}
                <div style={{position:"relative",overflow:"hidden"}}>
                  <div style={{position:"absolute",top:-80,right:-60,width:260,height:260,borderRadius:"50%",background:"radial-gradient(circle,rgba(245,230,163,0.35),transparent 70%)",pointerEvents:"none"}}/>
                  <div key={activeIdx} style={{padding:"48px 44px",display:"flex",flexDirection:"column",justifyContent:"center",height:"100%",animation:"panelFadeIn 0.45s cubic-bezier(0.16,1,0.3,1)",position:"relative",zIndex:2}}>
                    <div style={{width:68,height:68,borderRadius:22,background:"var(--yellow)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,marginBottom:26,animation:"iconBounce 2.4s ease-in-out infinite",boxShadow:"0 12px 28px rgba(245,230,163,0.4)"}}>{SERVICES[activeIdx].icon}</div>
                    <div style={{fontSize:11,fontWeight:700,color:"var(--text3)",letterSpacing:2,textTransform:"uppercase",marginBottom:10}}>Service {SERVICES[activeIdx].num} of 12</div>
                    <h3 style={{fontSize:"clamp(24px,3vw,34px)",fontWeight:800,color:"var(--dark)",letterSpacing:"-0.02em",marginBottom:16,lineHeight:1.15}}>{SERVICES[activeIdx].title}</h3>
                    <p style={{fontSize:15,color:"var(--text2)",lineHeight:1.85,marginBottom:22,maxWidth:440}}>{SERVICES[activeIdx].desc}</p>

                    {/* Feature tags */}
                    <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:26}}>
                      {SERVICES[activeIdx].tags.map((t,ti)=>(
                        <span key={ti} style={{fontSize:11.5,fontWeight:600,color:"var(--dark)",background:"var(--bg)",border:"1px solid var(--border)",borderRadius:100,padding:"6px 13px",animation:`tagPop 0.4s cubic-bezier(0.34,1.56,0.64,1) ${0.1+ti*0.08}s both`}}>{t}</span>
                      ))}
                    </div>

                    {/* Mini stat badge */}
                    <div style={{display:"inline-flex",alignItems:"center",gap:12,background:"var(--dark)",borderRadius:16,padding:"14px 20px",marginBottom:28,width:"fit-content"}}>
                      <div style={{fontSize:22,fontWeight:800,color:"var(--yellow)"}}>{SERVICES[activeIdx].stat}</div>
                      <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",fontWeight:600,textTransform:"uppercase",letterSpacing:0.6,maxWidth:80,lineHeight:1.3}}>{SERVICES[activeIdx].statLabel}</div>
                    </div>

                    <Link href={`/services/${SERVICES[activeIdx].slug}`} style={{display:"inline-flex",alignItems:"center",gap:8,background:"var(--dark)",color:"#fff",padding:"15px 28px",borderRadius:100,fontSize:14,fontWeight:700,width:"fit-content",transition:"transform 0.25s,box-shadow 0.25s",boxShadow:"0 6px 20px rgba(17,17,17,0.15)"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 12px 30px rgba(17,17,17,0.25)";}} onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 6px 20px rgba(17,17,17,0.15)";}}>
                      View Full Details →
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ══ Mobile — fully designed animated cards ══ */}
            <div className="services-grid-mobile" style={{display:"none",gridTemplateColumns:"1fr",gap:16,marginTop:8}}>
              {SERVICES.map((s,i)=>(
                <Reveal key={i} delay={(i%6)*0.05}>
                  <Link href={`/services/${s.slug}`} className="mobile-service-card" style={{display:"block",position:"relative",background:"#fff",border:"1px solid var(--border)",borderRadius:24,padding:"24px 22px",textDecoration:"none",overflow:"hidden",boxShadow:"var(--shadow)",transition:"all 0.35s cubic-bezier(0.16,1,0.3,1)"}}>
                    <div style={{position:"absolute",top:-20,right:-20,fontSize:90,opacity:0.05,pointerEvents:"none"}}>{s.icon}</div>
                    <div style={{position:"relative",zIndex:2}}>
                      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:14}}>
                        <div style={{width:48,height:48,borderRadius:14,background:"var(--bg)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{s.icon}</div>
                        <div style={{flex:1}}>
                          <div style={{fontSize:10,fontWeight:800,color:"var(--text3)",letterSpacing:1,marginBottom:2}}>SERVICE {s.num}</div>
                          <h4 style={{fontSize:16,fontWeight:800,color:"var(--dark)",lineHeight:1.25}}>{s.title}</h4>
                        </div>
                      </div>
                      <p style={{fontSize:13,color:"var(--text2)",lineHeight:1.7,marginBottom:16}}>{s.desc}</p>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                        <div style={{display:"flex",alignItems:"baseline",gap:6}}>
                          <span style={{fontSize:17,fontWeight:800,color:"var(--dark)"}}>{s.stat}</span>
                          <span style={{fontSize:10.5,color:"var(--text3)",fontWeight:600}}>{s.statLabel}</span>
                        </div>
                        <span style={{width:32,height:32,borderRadius:"50%",background:"var(--bg)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"var(--dark)"}}>→</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ LUXURIOUS ANIMATED CTA ══ */}
        <section style={{background:"var(--bg)",padding:"120px 32px",position:"relative",overflow:"hidden"}}>
          <Reveal dir="scale">
            <div style={{maxWidth:720,margin:"0 auto",position:"relative"}}>
              <div className="gradient-border" style={{borderRadius:32,padding:2,background:"linear-gradient(120deg,var(--yellow),rgba(245,230,163,0.15),var(--yellow),rgba(245,230,163,0.3),var(--yellow))",backgroundSize:"300% 300%",animation:"gradientMove 6s ease infinite"}}>
                <div style={{background:"var(--dark)",borderRadius:30,padding:"64px 48px",textAlign:"center",position:"relative",overflow:"hidden"}}>
                  <div style={{position:"absolute",top:-100,left:"50%",transform:"translateX(-50%)",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(245,230,163,0.14),transparent 65%)",pointerEvents:"none"}}/>
                  <div style={{position:"relative",zIndex:2}}>
                    <div style={{fontSize:13,fontWeight:700,color:"var(--yellow)",letterSpacing:2,textTransform:"uppercase",marginBottom:18}}>Not sure where to start?</div>
                    <h2 style={{fontSize:"clamp(28px,5vw,52px)",fontWeight:800,color:"#fff",letterSpacing:"-0.02em",lineHeight:1.05,marginBottom:24}}>We'll audit your billing<br/>completely free.</h2>
                    <p style={{fontSize:15,color:"rgba(255,255,255,0.5)",lineHeight:1.8,marginBottom:36,maxWidth:420,margin:"0 auto 36px"}}>Our specialists will review your current setup and recommend exactly which services will help most.</p>
                    <Link href="/contact" style={{display:"inline-flex",alignItems:"center",gap:10,background:"var(--yellow)",color:"var(--dark)",padding:"18px 36px",borderRadius:100,fontSize:15,fontWeight:800,boxShadow:"0 12px 40px rgba(245,230,163,0.35)",transition:"transform 0.3s,box-shadow 0.3s"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px) scale(1.02)";e.currentTarget.style.boxShadow="0 20px 52px rgba(245,230,163,0.5)";}} onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0) scale(1)";e.currentTarget.style.boxShadow="0 12px 40px rgba(245,230,163,0.35)";}}>
                      Get Free Audit →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer/>
      <style>{`
        @keyframes breathe{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.35;transform:scale(1.5)}}
        @keyframes floatBlob{0%,100%{transform:translate(0,0)}50%{transform:translate(-16px,14px)}}
        @keyframes panelFadeIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes iconBounce{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-8px) rotate(-4deg)}}
        @keyframes tagPop{from{opacity:0;transform:scale(0.7) translateY(6px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes gradientMove{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        .mobile-service-card:hover{ transform:translateY(-6px); box-shadow:0 20px 48px rgba(17,17,17,0.1) !important; border-color:var(--dark) !important; }
        @media(max-width:768px){
          .stats-thin{grid-template-columns:1fr 1fr !important;}
          .showcase-grid{display:none !important;}
          .services-grid-mobile{display:grid !important;}
        }
      `}</style>
    </>
  );
}
