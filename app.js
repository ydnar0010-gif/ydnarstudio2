const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(){navigation.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));navigation.classList.toggle('is-open',open);});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu();});
window.matchMedia('(min-width: 601px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
document.querySelector('#year').textContent=new Date().getFullYear();
const projects={
 booking:{label:'INTERACTIVE CONCEPT / BOOKING EXPERIENCE',title:'A simpler way to book.',intro:'Try choosing a service, a day, and a time. The demo shows a booking summary without making a real reservation.',mode:'booking',problem:'A customer should be able to understand their options and find a time without a long exchange of messages.',solution:'A focused booking flow with explicit choices, clear feedback, and a summary before the next step.',disclosure:'Concept demonstration using fictional services and availability. No bookings are sent or stored.'},
 pipeline:{label:'INTERACTIVE CONCEPT / CLIENT WORKSPACE',title:'Inquiries, without the chaos.',intro:'Explore fictional inquiries, filter by status, and move a customer to the next stage. Changes stay within this demo.',mode:'pipeline',problem:'When inquiries are scattered across conversations, the next action can be difficult to track.',solution:'A simple workspace with visible stages, inquiry details, and a deliberate next step for each customer.',disclosure:'Concept demonstration with fictional people and inquiries. It is not connected to a CRM or an email service.'},
 portfolio:{label:'WORKING BUILD / YDNAR STUDIO',title:'A portfolio with a clear purpose.',intro:'This website is designed to help a business owner understand the services, explore concrete examples, and start a useful conversation.',problem:'The previous portfolio had unfinished project destinations, competing visual effects, and a contact experience without much guidance.',solution:'A restrained design, working concept demos, accessible native dialogs, responsive layouts, and an inquiry composer that clearly explains how your message is sent.',disclosure:'Balanse and Tinda link to live applications. The workflow demo uses fictional data. Client testimonials and performance claims are omitted until supporting material is available.'}
};
const projectDialog=document.querySelector('#project-dialog');
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
 const project=projects[button.dataset.project];
 document.querySelector('#project-label').textContent=project.label;
 document.querySelector('#project-title').textContent=project.title;
 const content=document.querySelector('#project-content'); content.replaceChildren();
 const intro=document.createElement('p');intro.className='project-intro';intro.textContent=project.intro;content.append(intro);
 if(project.mode){const iframe=document.createElement('iframe');iframe.src='demo.html?mode='+project.mode;iframe.title=project.title+' Interactive demo';iframe.className='demo-frame';content.append(iframe);}
 const notes=document.createElement('div');notes.className='project-notes';
 for(const [heading,body] of [['The problem',project.problem],['The approach',project.solution]]){const section=document.createElement('section');const h=document.createElement('h3');h.textContent=heading;const p=document.createElement('p');p.textContent=body;section.append(h,p);notes.append(section);}content.append(notes);
 const disclosure=document.createElement('p');disclosure.className='project-disclosure';disclosure.textContent=project.disclosure;content.append(disclosure);
 projectDialog.showModal();document.body.classList.add('dialog-open');
}));
const briefDialog=document.querySelector('#brief-dialog');
const briefForm=document.querySelector('#brief-form');
const briefStatus=document.querySelector('#brief-status');
document.querySelectorAll('[data-brief]').forEach(button=>button.addEventListener('click',()=>{if(button.dataset.service)briefForm.elements.service.value=button.dataset.service;briefStatus.textContent='';briefDialog.showModal();document.body.classList.add('dialog-open');}));
document.querySelectorAll('dialog').forEach(dialog=>{
 dialog.querySelector('[data-close]').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{document.body.classList.remove('dialog-open');if(dialog===projectDialog)document.querySelector('#project-content').replaceChildren();});
});
function composeInquiry(){const data=new FormData(briefForm);return 'Hello Ydnar,\n\nI would like to discuss '+data.get('service').toLowerCase()+'.\n\nName: '+data.get('name').trim()+'\nEmail: '+data.get('email').trim()+'\n\nProject details:\n'+data.get('message').trim()+'\n\nThank you!';}
briefForm.addEventListener('submit',event=>{event.preventDefault();const subject='Project inquiry: '+briefForm.elements.service.value;window.location.href='mailto:ydnar0010@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(composeInquiry());briefStatus.textContent='Your email app has been requested. Review and send the message there. If it does not open, use Copy inquiry and paste it into your email.';});
document.querySelector('#copy-brief').addEventListener('click',async()=>{if(!briefForm.reportValidity())return;try{await navigator.clipboard.writeText(composeInquiry());briefStatus.textContent='Inquiry copied. Paste it into an email to ydnar0010@gmail.com.';}catch{briefStatus.textContent='Automatic copying is unavailable. Select the text below to copy it.';let fallback=document.querySelector('#copy-fallback');if(!fallback){fallback=document.createElement('textarea');fallback.id='copy-fallback';fallback.setAttribute('aria-label','Inquiry text to copy');fallback.readOnly=true;briefStatus.after(fallback);}fallback.value=composeInquiry();fallback.focus();fallback.select();}});
