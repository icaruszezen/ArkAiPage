/*
 * 联系我们：左缘一条通高的黄色竖带（官网"公告"的排法），左栏是咨询邮箱，右栏是咨询表单。
 * 表单不经过后台：提交时打开访客自己的邮件应用，收件人、主题和正文都已经填好。
 */
import {
  Alert,
  Button,
  Field,
  Input,
  SectionTitle,
  Segment,
  SegmentedControl,
  Textarea,
} from "@endfield-ui/react";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { IsoArt } from "../art/iso.tsx";
import { bandArt } from "../art/scenes.ts";
import { supportEmail, type Need } from "../content.ts";
import { useCopy } from "../i18n.ts";
import { MailIcon } from "../icons.tsx";

/* 记下哪几项有问题，不记文字：换语言时错误说明跟着换 */
type Errors = Partial<Record<"name" | "need", true>>;

/* 一行联系方式：dl 里每一组只放 dt 和 dd，图标放进 dt 里 */
function ContactRow({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="relative border-t border-line py-4 pl-9">
      <dt className="font-tech text-xs text-ink-secondary">
        <span
          aria-hidden="true"
          className="absolute top-[1.125rem] left-0 text-ink-secondary"
        >
          {icon}
        </span>
        {label}
      </dt>
      <dd className="mt-1 font-medium wrap-anywhere">{children}</dd>
    </div>
  );
}

/* mailto 链接：正文的换行按规范写成 CRLF */
function mailto(subject: string, body: string) {
  const encode = (text: string) =>
    encodeURIComponent(text.replace(/\r?\n/g, "\r\n"));
  return `mailto:${supportEmail}?subject=${encode(subject)}&body=${encode(body)}`;
}

export function Contact({
  need,
  onNeedChange,
}: {
  need: Need | null;
  onNeedChange: (need: Need) => void;
}) {
  const { contact, solutions } = useCopy();
  const [errors, setErrors] = useState<Errors>({});
  const [ready, setReady] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  /* 咨询方向：三条业务线的短名，再加一个"其他" */
  const needs: { value: Need; label: string }[] = [
    ...solutions.items.map((item) => ({ value: item.key, label: item.short })),
    { value: "other", label: contact.other },
  ];

  const clear = (key: keyof Errors) =>
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const field = (key: string) => String(data.get(key) ?? "").trim();
    const name = field("name");
    const needLabel = needs.find((item) => item.value === field("need"))?.label;
    const next: Errors = {};
    if (!name) next.name = true;
    if (!needLabel) next.need = true;
    setErrors(next);
    setReady(false);
    if (!needLabel || Object.keys(next).length > 0) {
      // 焦点移到第一个有问题的字段，读屏会读出它的错误说明。
      // 咨询方向是一组单选：有选中的就落在选中的那个上，没有就落在第一个上
      const first = (["name", "need"] as const).find((key) => next[key]);
      if (first)
        form
          .querySelector<HTMLElement>(
            first === "need"
              ? '[name="need"]:checked, [name="need"]'
              : `[name="${first}"]`,
          )
          ?.focus();
      return;
    }

    const { mail } = contact;
    const company = field("company");
    const message = field("message");
    const body = [
      `${mail.name}${mail.colon}${name}`,
      company && `${mail.company}${mail.colon}${company}`,
      `${mail.need}${mail.colon}${needLabel}`,
      message && `\n${mail.message}${mail.colon.trim()}\n${message}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = mailto(mail.subject(needLabel, name), body);

    // 打开没打开邮件应用，页面无从知道：按钮上面如实说一句，并给出邮箱
    setReady(true);
    requestAnimationFrame(() =>
      resultRef.current?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      }),
    );
  }

  return (
    <section id="contact" className="relative bg-surface">
      {/* 左缘的黄色竖带：贴着舞台左边（导航轨旁边），顶上一块线稿，底下竖排的版块名 */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 hidden w-16 flex-col items-center justify-between bg-action py-8 text-on-action md:flex"
      >
        <div data-theme="light" className="text-ink">
          <IsoArt shapes={bandArt} padding={3} className="w-10" />
        </div>
        <span className="font-latin text-2xl font-medium tracking-label uppercase [writing-mode:vertical-rl]">
          Contact
        </span>
      </div>

      {/*
       * 内容区和别的版块一样居中；左边的留白不够让开竖带时，左内边距补足
       * （百分比相对整个版块的宽度算，减去居中留出来的那一截）
       */}
      <div className="mx-auto grid w-full max-w-page min-w-0 gap-x-16 gap-y-12 px-4 py-24 sm:px-6 md:pl-[max(1.5rem,calc(5.5rem-max(0px,(100%-var(--container-page))/2)))] lg:px-10 lg:pl-[max(2.5rem,calc(6.5rem-max(0px,(100%-var(--container-page))/2)))] xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="flex min-w-0 flex-col gap-6">
          <SectionTitle latin="Contact" meta={contact.meta}>
            {contact.title}
          </SectionTitle>
          <p className="max-w-prose text-ink-secondary">{contact.intro}</p>
          <dl className="mt-2 border-b border-line">
            <ContactRow
              icon={<MailIcon size={20} />}
              label={contact.emailLabel}
            >
              <a
                href={`mailto:${supportEmail}`}
                className="underline decoration-line-strong decoration-1 underline-offset-4 transition-colors duration-(--duration-fast) hover:decoration-action focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                {supportEmail}
              </a>
            </ContactRow>
          </dl>
        </div>

        <form
          noValidate
          onSubmit={onSubmit}
          aria-label={contact.formLabel}
          className="flex min-w-0 flex-col gap-6 sm:border sm:border-line sm:bg-surface-raised sm:p-8"
        >
          <div className="flex flex-col gap-1.5 text-sm text-ink-secondary">
            <p>{contact.note}</p>
            {/* 每个必填的控件自己会读出"必填"，这句只给看得见记号的人 */}
            <p aria-hidden="true" className="flex items-center">
              {contact.requiredBefore}
              <span className="mx-1.5 inline-block size-1.5 rotate-45 bg-accent-ink" />
              {contact.requiredAfter}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              label={contact.name}
              required
              error={errors.name && contact.errors.name}
            >
              <Input
                name="name"
                autoComplete="name"
                placeholder={contact.namePlaceholder}
                onChange={() => clear("name")}
              />
            </Field>
            <Field label={contact.company}>
              <Input name="company" autoComplete="organization" />
            </Field>
          </div>
          {/* 一组单选：group 让它成为 fieldset + legend */}
          <Field
            label={contact.need}
            required
            group
            error={errors.need && contact.errors.need}
          >
            <SegmentedControl
              name="need"
              value={need ?? ""}
              onValueChange={(value) => {
                onNeedChange(value as Need);
                clear("need");
              }}
              className="w-full"
            >
              {needs.map((item) => (
                <Segment
                  key={item.value}
                  value={item.value}
                  className="px-2 sm:px-4"
                >
                  {item.label}
                </Segment>
              ))}
            </SegmentedControl>
          </Field>
          <Field label={contact.message} help={contact.messageHelp}>
            <Textarea name="message" rows={4} maxLength={500} showCount />
          </Field>

          {/*
           * 提交结果：放在按钮正上方。播报区一直在页面里，只换里面的内容，
           * 读屏才会读出来；空着的时候抵掉表单的一格间距
           */}
          <div
            ref={resultRef}
            aria-live="polite"
            aria-atomic="true"
            className="scroll-mb-4 empty:-mt-6"
          >
            {ready && (
              <Alert role="none" tone="info" title={contact.ready.title}>
                {contact.ready.body}
              </Alert>
            )}
          </div>
          <div className="flex justify-end">
            <Button type="submit" size="lg">
              {contact.submit}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
