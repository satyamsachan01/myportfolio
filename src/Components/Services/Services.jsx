import React from "react";
const services = [
  {icon:"</>", title:"Full-Stack Development", text:"Responsive React interfaces and scalable functionality built around real business goals.", tags:["React","JavaScript","Java","REST APIs"]},
  {icon:"W", title:"WordPress Development", text:"Custom, dashboard-editable WordPress websites, WooCommerce solutions and technical fixes.", tags:["Custom Themes","WooCommerce","SEO"]},
  {icon:"◆", title:"Shopify Commerce", text:"Premium storefront experiences with clear product discovery and a conversion-focused customer journey.", tags:["Liquid","Store Setup","CRO"]},
  {icon:"⌁", title:"Security & Performance", text:"Malware removal, hardening, Core Web Vitals work and dependable website maintenance.", tags:["Malware Cleanup","Speed","Care"]}
];
const Services = () => <section id="services" className="services section-shell section-block"><div className="section-heading"><span className="section-no">02</span><div><p className="kicker">What I do best</p><h2>Expertise that moves<br/><span>projects forward.</span></h2></div></div><div className="service-grid">{services.map((s,i)=><article className="service-card" key={s.title}><div className="service-top"><span className="service-icon">{s.icon}</span><span className="card-no">0{i+1}</span></div><h3>{s.title}</h3><p>{s.text}</p><div className="tag-row">{s.tags.map(t=><span key={t}>{t}</span>)}</div></article>)}</div></section>;
export default Services;
