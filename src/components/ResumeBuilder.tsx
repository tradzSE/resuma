"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  createId,
  defaultResume,
  emptyCertification,
  emptyEducation,
  emptyExperience,
  emptyProject,
  sampleResume,
  type Certification,
  type Education,
  type Experience,
  type Project,
  type ResumeData,
} from "@/lib/resume";

const STORAGE_KEY = "resuma-resume-data-v2";
const STYLE_KEY = "resuma-document-style";
const TITLE_COLOR_KEY = "resuma-title-color";

const fieldPlaceholders: Record<string, string> = {
  "Full name": "e.g. Maria Santos",
  Location: "e.g. Quezon City, Philippines",
  Email: "e.g. maria.santos@email.com",
  Phone: "e.g. +63 917 123 4567",
  LinkedIn: "e.g. linkedin.com/in/mariasantos",
  Portfolio: "e.g. mariasantos.dev",
  School: "e.g. Central Luzon State University",
  "Degree or program": "e.g. BS Information Technology",
  Start: "e.g. 2022",
  End: "e.g. 2026 or Present",
  Organization: "e.g. Acme Technologies",
  Role: "e.g. Software Engineering Intern",
  "Project name": "e.g. Campus Navigation App",
  Link: "e.g. project.example.com",
  Technologies: "e.g. React, Node.js, MySQL",
  Certification: "e.g. Computer Systems Servicing NC II",
  Issuer: "e.g. TESDA",
  Date: "e.g. June 2025",
};

const textAreaPlaceholders: Record<string, string> = {
  "Professional summary": "e.g. Software engineer focused on building reliable, user-friendly web applications.",
  "Academic details": "e.g. Relevant coursework: Software Engineering, Database Systems",
  Achievements: "e.g. Improved processing time by 30% through workflow automation.",
  Highlights: "e.g. Built and deployed a responsive application used by 500 students.",
  Skills: "e.g. Languages: JavaScript, TypeScript, PHP\nFrameworks: React, Next.js, Node.js",
};

const splitLines = (value: string) => value.split("\n").map((line) => line.trim()).filter(Boolean);
const exportFileName = (fullName: string) => {
  const nameParts = fullName.trim().split(/\s+/).map((part) => part.replace(/[^a-zA-Z0-9-]/g, "")).filter(Boolean);
  if (nameParts.length === 0) return "Resume";
  if (nameParts.length === 1) return `${nameParts[0]}_Resume`;
  return `${nameParts[0]}_${nameParts[nameParts.length - 1]}_Resume`;
};

const fieldMeta: Record<string, { type?: string; autoComplete?: string; inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"] }> = {
  "Full name": { autoComplete: "name" },
  Location: { autoComplete: "address-level2" },
  Email: { type: "email", autoComplete: "email", inputMode: "email" },
  Phone: { type: "tel", autoComplete: "tel", inputMode: "tel" },
  LinkedIn: { type: "url", autoComplete: "url", inputMode: "url" },
  Portfolio: { type: "url", autoComplete: "url", inputMode: "url" },
  Link: { type: "url", autoComplete: "off", inputMode: "url" },
  Organization: { autoComplete: "organization" },
  Role: { autoComplete: "organization-title" },
};

function Field({ label, value, onChange, placeholder = "", type }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; type?: string }) {
  const metadata = fieldMeta[label] ?? {};
  const inputType = type ?? metadata.type ?? "text";
  const fieldName = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return <label className="field"><span>{label}</span><input name={fieldName} type={inputType} inputMode={metadata.inputMode} autoComplete={metadata.autoComplete ?? "off"} spellCheck={inputType !== "email" && inputType !== "url"} value={value} placeholder={placeholder || fieldPlaceholders[label] || ""} onChange={(event) => onChange(event.target.value)} /></label>;
}

function TextArea({ label, value, onChange, placeholder = "", rows = 4 }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; rows?: number }) {
  return <label className="field"><span>{label}</span><textarea name={label.toLowerCase().replace(/[^a-z0-9]+/g, "-")} autoComplete="off" value={value} placeholder={placeholder || textAreaPlaceholders[label] || ""} rows={rows} onChange={(event) => onChange(event.target.value)} /></label>;
}

function EditorSection({ id, title, description, children, active }: { id: string; title: string; description: string; children: React.ReactNode; active: boolean }) {
  return <section className="editor-section" id={id} hidden={!active}><header><p>{title}</p><span>{description}</span></header><div className="section-fields">{children}</div></section>;
}

function ItemCard({ label, index, total, onRemove, onMoveUp, onMoveDown, children }: { label: string; index: number; total: number; onRemove: () => void; onMoveUp: () => void; onMoveDown: () => void; children: React.ReactNode }) {
  return <div className="item-card"><div className="item-card-head"><strong>{label}</strong><div className="item-card-actions"><button type="button" className="text-button" onClick={onMoveUp} disabled={index === 0} aria-label={`Move ${label} up`} title="Move up">↑</button><button type="button" className="text-button" onClick={onMoveDown} disabled={index >= total - 1} aria-label={`Move ${label} down`} title="Move down">↓</button><button type="button" className="text-button danger" onClick={onRemove}>Remove</button></div></div>{children}</div>;
}

function ResumePreview({ data, previewRef, zoom, fontSize, documentStyle, titleColor }: { data: ResumeData; previewRef: React.RefObject<HTMLDivElement | null>; zoom: number; fontSize: number; documentStyle: "classic" | "centered"; titleColor: string }) {
  const contact = [data.contact.email, data.contact.phone, data.contact.location, data.contact.linkedin, data.contact.portfolio].filter(Boolean);
  return <article className={`resume-paper resume-style-${documentStyle}`} ref={previewRef} aria-label="Live resume preview" style={{ "--preview-zoom": zoom / 100, "--resume-font-size": `${fontSize}px`, "--resume-title-color": titleColor } as React.CSSProperties}>
    <header className="resume-header">
      {data.contact.fullName && <h1>{data.contact.fullName}</h1>}
      {contact.length > 0 && <p>{contact.join("  |  ")}</p>}
    </header>
    {data.summary.trim() && <ResumeSection title="Professional Summary"><p>{data.summary}</p></ResumeSection>}
    {data.education.length > 0 && <ResumeSection title="Education">{data.education.map((item) => <ResumeEntry key={item.id} title={item.school} subtitle={item.degree} location={item.location} dates={[item.startDate, item.endDate].filter(Boolean).join(" – ")} details={item.details} />)}</ResumeSection>}
    {data.experience.length > 0 && <ResumeSection title="Experience">{data.experience.map((item) => <ResumeEntry key={item.id} title={item.organization} subtitle={item.role} location={item.location} dates={[item.startDate, item.endDate].filter(Boolean).join(" – ")} bullets={splitLines(item.bullets)} />)}</ResumeSection>}
    {data.projects.length > 0 && <ResumeSection title="Projects">{data.projects.map((item) => <ResumeEntry key={item.id} title={item.name} subtitle={[item.technologies, item.link].filter(Boolean).join(" | ")} bullets={splitLines(item.bullets)} />)}</ResumeSection>}
    {data.skills.trim() && <ResumeSection title="Skills"><div className="skills-lines">{splitLines(data.skills).map((line) => <p key={line}>{line}</p>)}</div></ResumeSection>}
    {data.certifications.length > 0 && <ResumeSection title="Certifications">{data.certifications.map((item) => <div className="certification-row" key={item.id}><span><strong>{item.name}</strong>{item.issuer && `, ${item.issuer}`}</span><span>{item.date}</span></div>)}</ResumeSection>}
  </article>;
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="resume-section"><h2>{title}</h2>{children}</section>;
}

function ResumeEntry({ title, subtitle, location, dates, details, bullets }: { title: string; subtitle?: string; location?: string; dates?: string; details?: string; bullets?: string[] }) {
  if (![title, subtitle, location, dates, details, ...(bullets ?? [])].some(Boolean)) return null;
  return <div className="resume-entry">
    <div className="entry-line"><strong>{title || "Untitled entry"}</strong><span>{location}</span></div>
    <div className="entry-line"><em>{subtitle}</em><span>{dates}</span></div>
    {details && <p>{details}</p>}
    {bullets && bullets.length > 0 && <ul>{bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
  </div>;
}

export default function ResumeBuilder() {
  const [data, setData] = useState<ResumeData>(defaultResume);
  const [mobileView, setMobileView] = useState<"edit" | "preview">("edit");
  const [activeSection, setActiveSection] = useState("contact");
  const [previewZoom, setPreviewZoom] = useState(82);
  const [resumeFontSize, setResumeFontSize] = useState(11);
  const fontSizeLabelRef = useRef<HTMLElement>(null);
  const fontSizeFrameRef = useRef<number | null>(null);
  const [documentStyle, setDocumentStyle] = useState<"classic" | "centered">("classic");
  const [titleColor, setTitleColor] = useState("#111111");
  const [exportingPdf, setExportingPdf] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pendingAction, setPendingAction] = useState<"reset" | "sample" | "empty" | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const mobileActionsRef = useRef<HTMLDetailsElement>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    const savedResume = localStorage.getItem(STORAGE_KEY);
    const savedStyle = localStorage.getItem(STYLE_KEY);
    const savedTitleColor = localStorage.getItem(TITLE_COLOR_KEY);
    let parsedResume: ResumeData | null = null;
    if (savedResume) {
      try {
        parsedResume = JSON.parse(savedResume) as ResumeData;
      } catch { localStorage.removeItem(STORAGE_KEY); }
    }
    const timer = window.setTimeout(() => {
      if (parsedResume) setData(parsedResume);
      if (savedStyle === "classic" || savedStyle === "centered") setDocumentStyle(savedStyle);
      if (savedTitleColor && /^#[0-9a-f]{6}$/i.test(savedTitleColor)) setTitleColor(savedTitleColor);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem(STYLE_KEY, documentStyle);
    localStorage.setItem(TITLE_COLOR_KEY, titleColor);
  }, [documentStyle, titleColor]);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    const showTimer = window.setTimeout(() => setSaved(true), 0);
    const hideTimer = window.setTimeout(() => setSaved(false), 1200);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, [data]);

  useEffect(() => {
    if (!pendingAction) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialogRef.current?.focus();
    const closeDialog = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPendingAction(null);
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter((element) => !element.hasAttribute("disabled"));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", closeDialog);
    return () => {
      window.removeEventListener("keydown", closeDialog);
      previousFocus?.focus();
    };
  }, [pendingAction]);

  const requestAction = (action: "reset" | "sample") => {
    mobileActionsRef.current?.removeAttribute("open");
    setPendingAction(action);
  };

  const updateContact = (key: keyof ResumeData["contact"], value: string) => setData((current) => ({ ...current, contact: { ...current.contact, [key]: value } }));
  const updateList = <T extends { id: string }>(key: "education" | "experience" | "projects" | "certifications", id: string, patch: Partial<T>) => setData((current) => ({ ...current, [key]: (current[key] as unknown as T[]).map((item) => item.id === id ? { ...item, ...patch } : item) }));
  const removeItem = (key: "education" | "experience" | "projects" | "certifications", id: string) => setData((current) => ({ ...current, [key]: current[key].filter((item) => item.id !== id) }));
  const moveItem = (list: "education" | "experience" | "projects" | "certifications", index: number, direction: -1 | 1) => {
    setData((current) => {
      const items = [...current[list]];
      const targetIndex = index + direction;
      if (index < 0 || targetIndex < 0 || targetIndex >= items.length) return current;
      const [movedItem] = items.splice(index, 1);
      items.splice(targetIndex, 0, movedItem);
      return { ...current, [list]: items };
    });
  };
  const exportPdf = async () => {
    if (!previewRef.current || exportingPdf) return;
    if (isResumeEmpty(data)) {
      setPendingAction("empty");
      return;
    }
    setExportingPdf(true);
    const paper = previewRef.current;
    const previousZoom = paper.style.getPropertyValue("--preview-zoom");

    try {
      paper.style.setProperty("--preview-zoom", "1");
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")]);
      const canvas = await html2canvas(paper, { scale: 2, backgroundColor: "#ffffff", logging: false, useCORS: true });
      const pdf = new jsPDF({ orientation: "portrait", unit: "pt", format: "letter", compress: true });
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.96), "JPEG", 0, 0, 612, 792, undefined, "FAST");
      pdf.save(`${exportFileName(data.contact.fullName)}.pdf`);
    } finally {
      paper.style.setProperty("--preview-zoom", previousZoom || String(previewZoom / 100));
      setExportingPdf(false);
    }
  };

  const confirmPendingAction = () => {
    if (pendingAction === "reset") setData(defaultResume);
    if (pendingAction === "sample") setData({ ...sampleResume, education: sampleResume.education.map((item) => ({ ...item, id: createId() })), experience: sampleResume.experience.map((item) => ({ ...item, id: createId() })), projects: sampleResume.projects.map((item) => ({ ...item, id: createId() })), certifications: sampleResume.certifications.map((item) => ({ ...item, id: createId() })) });
    setPendingAction(null);
  };

  const isResumeEmpty = (resume: ResumeData) => {
    const contactFilled = Object.values(resume.contact).some((value) => value.trim());
    const listFilled = [...resume.education, ...resume.experience, ...resume.projects, ...resume.certifications].some((item) => Object.values(item).some((value) => typeof value === "string" && value.trim()));
    return !contactFilled && !resume.summary.trim() && !resume.skills.trim() && !listFilled;
  };

  return <div className="builder-shell">
    <a className="skip-link" href="#main">Skip to resume editor</a>
    <header className="app-header">
      <div className="brand-lockup"><div className="brand-copy"><Link href="/" className="brand" translate="no">Resuma</Link><span>Professional resume workspace</span></div><span className={saved ? "save-status visible" : "save-status"} role="status" aria-live="polite">Saved locally</span></div>
      <div className="header-actions"><button type="button" className="button secondary" onClick={() => requestAction("reset")}>Reset</button><button type="button" className="button secondary" onClick={() => requestAction("sample")}>Load sample</button><details className="mobile-actions" ref={mobileActionsRef}><summary aria-label="Open resume actions">Actions</summary><div><button type="button" onClick={() => requestAction("sample")}>Load Sample</button><button type="button" onClick={() => requestAction("reset")}>Reset Resume</button></div></details><button type="button" className="button primary" onClick={exportPdf} disabled={exportingPdf}>{exportingPdf ? "Preparing PDF…" : "Download PDF"}</button></div>
    </header>
    <div className="workspace-bar">
      <nav className="workspace-tabs" aria-label="Resume categories">
        {[['contact', 'Contact'], ['education', 'Education'], ['experience', 'Experience'], ['projects', 'Projects'], ['skills', 'Skills'], ['certifications', 'More']].map(([id, label]) => <button key={id} type="button" className={activeSection === id ? "active" : ""} onClick={() => { setActiveSection(id); setMobileView("edit"); }}>{label}</button>)}
      </nav>
      <div className="preview-toolbar"><span>Resume preview</span><div className="preview-controls"><label className="style-control"><small>Format</small><select aria-label="Resume format" value={documentStyle} onChange={(event) => setDocumentStyle(event.target.value as "classic" | "centered")}><option value="classic">Classic</option><option value="centered">Centered</option></select></label><label className="color-control"><small>Titles</small><input aria-label="Title color" type="color" value={titleColor} onChange={(event) => setTitleColor(event.target.value)} /></label><label><small>Zoom</small><input aria-label="Preview zoom" type="range" min="50" max="150" value={previewZoom} onChange={(event) => setPreviewZoom(Number(event.target.value))} /><b>{previewZoom}%</b></label><label className="font-size-control"><small>Font size</small><input aria-label="Resume font size" type="range" min="9" max="14" step="0.5" defaultValue={resumeFontSize} onInput={(event) => { const value = Number(event.currentTarget.value); if (fontSizeFrameRef.current !== null) cancelAnimationFrame(fontSizeFrameRef.current); fontSizeFrameRef.current = requestAnimationFrame(() => { previewRef.current?.style.setProperty("--resume-font-size", `${value}px`); if (fontSizeLabelRef.current) fontSizeLabelRef.current.textContent = `${value} pt`; fontSizeFrameRef.current = null; }); }} onPointerUp={(event) => setResumeFontSize(Number(event.currentTarget.value))} onKeyUp={(event) => setResumeFontSize(Number(event.currentTarget.value))} onBlur={(event) => setResumeFontSize(Number(event.currentTarget.value))} /><b ref={fontSizeLabelRef}>{resumeFontSize} pt</b></label></div></div>
    </div>
    <nav className="mobile-tabs" aria-label="Builder view"><button className={mobileView === "edit" ? "active" : ""} onClick={() => setMobileView("edit")}>Edit</button><button className={mobileView === "preview" ? "active" : ""} onClick={() => setMobileView("preview")}>Preview</button></nav>
    <main id="main" className="builder-grid">
      <section className={`editor-panel ${mobileView !== "edit" ? "mobile-hidden" : ""}`} aria-label="Resume editor">
        <EditorSection id="contact" title="Contact" description="Personal details and professional summary" active={activeSection === "contact"}>
          <div className="two-fields"><Field label="Full name" value={data.contact.fullName} onChange={(value) => updateContact("fullName", value)} /><Field label="Location" value={data.contact.location} onChange={(value) => updateContact("location", value)} /></div>
          <div className="two-fields"><Field label="Email" type="email" value={data.contact.email} onChange={(value) => updateContact("email", value)} /><Field label="Phone" value={data.contact.phone} onChange={(value) => updateContact("phone", value)} /></div>
          <div className="two-fields"><Field label="LinkedIn" value={data.contact.linkedin} onChange={(value) => updateContact("linkedin", value)} /><Field label="Portfolio" value={data.contact.portfolio} onChange={(value) => updateContact("portfolio", value)} /></div>
          <TextArea label="Professional summary" value={data.summary} onChange={(summary) => setData((current) => ({ ...current, summary }))} rows={4} />
        </EditorSection>
        <EditorSection id="education" title="Education" description="Degrees, schools, and academic details — use ↑ ↓ to reorder" active={activeSection === "education"}>
          {data.education.map((item, index) => <ItemCard key={item.id} label={`Education ${index + 1}`} index={index} total={data.education.length} onRemove={() => removeItem("education", item.id)} onMoveUp={() => moveItem("education", index, -1)} onMoveDown={() => moveItem("education", index, 1)}><div className="two-fields"><Field label="School" value={item.school} onChange={(school) => updateList<Education>("education", item.id, { school })} /><Field label="Location" value={item.location} onChange={(location) => updateList<Education>("education", item.id, { location })} /></div><Field label="Degree or program" value={item.degree} onChange={(degree) => updateList<Education>("education", item.id, { degree })} /><div className="two-fields"><Field label="Start" value={item.startDate} onChange={(startDate) => updateList<Education>("education", item.id, { startDate })} /><Field label="End" value={item.endDate} onChange={(endDate) => updateList<Education>("education", item.id, { endDate })} /></div><TextArea label="Academic details" value={item.details} onChange={(details) => updateList<Education>("education", item.id, { details })} rows={3} /></ItemCard>)}
          <button type="button" className="add-button" onClick={() => setData((current) => ({ ...current, education: [...current.education, emptyEducation()] }))}>Add education</button>
        </EditorSection>
        <EditorSection id="experience" title="Experience" description="Work, internships, and leadership — use ↑ ↓ to reorder" active={activeSection === "experience"}>
          {data.experience.map((item, index) => <ItemCard key={item.id} label={`Experience ${index + 1}`} index={index} total={data.experience.length} onRemove={() => removeItem("experience", item.id)} onMoveUp={() => moveItem("experience", index, -1)} onMoveDown={() => moveItem("experience", index, 1)}><div className="two-fields"><Field label="Organization" value={item.organization} onChange={(organization) => updateList<Experience>("experience", item.id, { organization })} /><Field label="Location" value={item.location} onChange={(location) => updateList<Experience>("experience", item.id, { location })} /></div><Field label="Role" value={item.role} onChange={(role) => updateList<Experience>("experience", item.id, { role })} /><div className="two-fields"><Field label="Start" value={item.startDate} onChange={(startDate) => updateList<Experience>("experience", item.id, { startDate })} /><Field label="End" value={item.endDate} onChange={(endDate) => updateList<Experience>("experience", item.id, { endDate })} /></div><TextArea label="Achievements" value={item.bullets} onChange={(bullets) => updateList<Experience>("experience", item.id, { bullets })} rows={5} /></ItemCard>)}
          <button type="button" className="add-button" onClick={() => setData((current) => ({ ...current, experience: [...current.experience, emptyExperience()] }))}>Add experience</button>
        </EditorSection>
        <EditorSection id="projects" title="Projects" description="Relevant technical or academic work — use ↑ ↓ to reorder" active={activeSection === "projects"}>
          {data.projects.map((item, index) => <ItemCard key={item.id} label={`Project ${index + 1}`} index={index} total={data.projects.length} onRemove={() => removeItem("projects", item.id)} onMoveUp={() => moveItem("projects", index, -1)} onMoveDown={() => moveItem("projects", index, 1)}><div className="two-fields"><Field label="Project name" value={item.name} onChange={(name) => updateList<Project>("projects", item.id, { name })} /><Field label="Link" value={item.link} onChange={(link) => updateList<Project>("projects", item.id, { link })} /></div><Field label="Technologies" value={item.technologies} onChange={(technologies) => updateList<Project>("projects", item.id, { technologies })} /><TextArea label="Highlights" value={item.bullets} onChange={(bullets) => updateList<Project>("projects", item.id, { bullets })} rows={5} /></ItemCard>)}
          <button type="button" className="add-button" onClick={() => setData((current) => ({ ...current, projects: [...current.projects, emptyProject()] }))}>Add project</button>
        </EditorSection>
        <EditorSection id="skills" title="Skills" description="Group skills by category" active={activeSection === "skills"}><TextArea label="Skills" value={data.skills} onChange={(skills) => setData((current) => ({ ...current, skills }))} rows={7} /></EditorSection>
        <EditorSection id="certifications" title="Certifications" description="Courses, licenses, and credentials — use ↑ ↓ to reorder" active={activeSection === "certifications"}>
          {data.certifications.map((item, index) => <ItemCard key={item.id} label={`Certification ${index + 1}`} index={index} total={data.certifications.length} onRemove={() => removeItem("certifications", item.id)} onMoveUp={() => moveItem("certifications", index, -1)} onMoveDown={() => moveItem("certifications", index, 1)}><Field label="Certification" value={item.name} onChange={(name) => updateList<Certification>("certifications", item.id, { name })} /><div className="two-fields"><Field label="Issuer" value={item.issuer} onChange={(issuer) => updateList<Certification>("certifications", item.id, { issuer })} /><Field label="Date" value={item.date} onChange={(date) => updateList<Certification>("certifications", item.id, { date })} /></div></ItemCard>)}
          <button type="button" className="add-button" onClick={() => setData((current) => ({ ...current, certifications: [...current.certifications, emptyCertification()] }))}>Add certification</button>
        </EditorSection>
      </section>
      <section className={`preview-panel ${mobileView !== "preview" ? "mobile-hidden" : ""}`} aria-label="Resume preview"><div className="paper-stage"><ResumePreview data={data} previewRef={previewRef} zoom={previewZoom} fontSize={resumeFontSize} documentStyle={documentStyle} titleColor={titleColor} /></div></section>
    </main>
    {pendingAction && (
      <div className="builder-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPendingAction(null); }}>
        <section className="builder-dialog" ref={dialogRef} tabIndex={-1} role="alertdialog" aria-modal="true" aria-labelledby="builder-dialog-title" aria-describedby="builder-dialog-description">
          <h2 id="builder-dialog-title">{pendingAction === "reset" ? "Start with a blank resume?" : pendingAction === "sample" ? "Load the sample resume?" : "Add something before exporting"}</h2>
          <p id="builder-dialog-description">{pendingAction === "reset" ? "This clears every field in the editor. Files you already exported will not be affected." : pendingAction === "sample" ? "This replaces the current draft with sample content so you can explore the builder." : "Enter at least your name or one resume entry, then download the PDF again."}</p>
          <div className="builder-dialog-actions">
            {pendingAction === "empty" ? <button type="button" className="button primary" onClick={() => setPendingAction(null)}>Continue Editing</button> : <><button type="button" className="button secondary" onClick={() => setPendingAction(null)}>Cancel</button><button type="button" className="button primary" onClick={confirmPendingAction}>{pendingAction === "reset" ? "Clear Resume" : "Load Sample"}</button></>}
          </div>
        </section>
      </div>
    )}
  </div>;
}
