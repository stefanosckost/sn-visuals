"use client";

import type { FormEvent } from "react";
import { useState } from "react";

import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { useLanguage } from "@/i18n/language";

const contactEmail = "stefano@snvisualsmedia.com";

export function Contact() {
  const { copy } = useLanguage();
  const contactCopy = copy.contact;
  const [isPrepared, setIsPrepared] = useState(false);
  const directContactMailto = `mailto:${contactEmail}?subject=${encodeURIComponent(
    `${contactCopy.subject} — S.N. Visuals`,
  )}`;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const getFormValue = (name: string) =>
      formData.get(name)?.toString().trim() ?? "";
    const name = getFormValue("name");
    const email = getFormValue("email");
    const channel = getFormValue("channel");
    const projectIdea = getFormValue("project-idea");
    const deadline = getFormValue("deadline");
    const message = getFormValue("message");
    const subject = `${contactCopy.subject} — ${projectIdea || "S.N. Visuals"}`;
    const body = [
      contactCopy.emailBodyTitle,
      "",
      `${contactCopy.name}:`,
      name,
      "",
      `${contactCopy.email}:`,
      email,
      "",
      `${contactCopy.channel}:`,
      channel,
      "",
      `${contactCopy.projectIdea}:`,
      projectIdea,
      "",
      `${contactCopy.deadlineBody}:`,
      deadline,
      "",
      `${contactCopy.message}:`,
      message,
    ].join("\n");

    setIsPrepared(true);
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="pt-[72px] pb-10 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <Reveal>
          <SectionHeader
            label={contactCopy.label}
            title={contactCopy.title}
            body={contactCopy.body}
          />
          </Reveal>

          <Reveal delay={100}>
          <form
            action={directContactMailto}
            method="post"
            encType="text/plain"
            onSubmit={handleSubmit}
            className="lab-panel grid gap-4 rounded-[34px] border border-[#46f0e5]/25 bg-[#0b0b0d] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={contactCopy.name} name="name" />
              <Field label={contactCopy.email} name="email" type="email" />
            </div>
            <Field label={contactCopy.channel} name="channel" />
            <Field label={contactCopy.projectIdea} name="project-idea" />
            <Field label={contactCopy.deadline} name="deadline" type="date" />
            <label className="grid gap-2 text-sm text-[#f4f1ea]/70">
              <span>{contactCopy.message}</span>
              <textarea
                name="message"
                rows={5}
                className="resize-none rounded-[22px] border border-white/10 bg-[#07080d] px-4 py-3 text-white outline-none transition placeholder:text-[#f4f1ea]/28 focus:border-[#46f0e5]/80 focus:shadow-[0_0_0_3px_rgba(70,240,229,0.12)]"
                placeholder={contactCopy.messagePlaceholder}
              />
            </label>
            <button
              type="submit"
              className="mt-2 inline-flex justify-center rounded-full bg-[#46f0e5] px-5 py-3 text-sm font-semibold text-black transition duration-300 hover:-translate-y-1 hover:bg-[#ff4fa3] hover:shadow-[0_16px_46px_rgba(70,240,229,0.22)]"
            >
              {contactCopy.openDraft}
            </button>
            <a
              href={directContactMailto}
              className="inline-flex justify-center rounded-full border border-white/12 bg-white/[0.035] px-5 py-3 text-sm font-semibold text-white transition hover:border-[#ff4fa3]/70 hover:text-[#ff4fa3]"
            >
              {contactCopy.emailStefano}
            </a>
            {isPrepared ? (
              <p className="rounded-[18px] border border-[#46f0e5]/25 bg-[#46f0e5]/8 px-4 py-3 text-center text-sm text-[#46f0e5]">
                {contactCopy.prepared}
              </p>
            ) : null}
            <p className="text-center text-sm text-[#f4f1ea]/50">
              {contactCopy.preferEmail}{" "}
              <a
                href={directContactMailto}
                className="text-[#5df7ff] transition hover:text-white"
              >
                {contactEmail}
              </a>
            </p>
          </form>
          </Reveal>
        </div>

        <footer className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-[#f4f1ea]/45 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <p>{contactCopy.footerLeft}</p>
          <p>{contactCopy.footerRight}</p>
        </footer>
      </Container>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <label className="grid gap-2 text-sm text-[#f4f1ea]/70">
      <span>{label}</span>
      <input
        name={name}
        type={type}
        className="rounded-[18px] border border-white/10 bg-[#07080d] px-4 py-3 text-white outline-none transition placeholder:text-[#f4f1ea]/28 focus:border-[#46f0e5]/80 focus:shadow-[0_0_0_3px_rgba(70,240,229,0.12)]"
      />
    </label>
  );
}
