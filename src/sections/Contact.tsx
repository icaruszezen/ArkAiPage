/*
 * 联系我们：左缘一条通高的黄色竖带（官网"公告"的排法），左栏是联系方式，右栏是咨询表单。
 * 联系方式还是占位；表单还没有接后台，填之前和提交后都如实告诉访客。
 */
import {
  Alert,
  Button,
  Field,
  Input,
  SectionTitle,
  Segment,
  SegmentedControl,
  Tag,
  Textarea,
} from "@endfield-ui/react";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { IsoArt } from "../art/iso.tsx";
import { bandArt } from "../art/scenes.ts";
import { contact, needs, type Need } from "../content.ts";
import { ClockIcon, MailIcon, PhoneIcon, PinIcon } from "../icons.tsx";

type Errors = Partial<Record<"name" | "reach" | "need", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\+?[\d\s()-]{7,20}$/;
/* 只有符号没有数字的也不算电话 */
const isPhone = (value: string) =>
  PHONE.test(value) && value.replace(/\D/g, "").length >= 7;

/**
 * 表单接上后台了没有。没接上时表单顶上会先说明"提交后不会发出"；
 * 接上之后改成 true，并在 submitLead 里发请求
 */
const FORM_CONNECTED = false;

/**
 * 把一条咨询交给后台。现在还没有接口，所以如实返回"没接通"；
 * 接上之后在这里发请求，成功返回 "sent"。
 */
async function submitLead(_data: FormData): Promise<"sent" | "not-connected"> {
  return "not-connected";
}

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
      <dd className="mt-1 flex flex-wrap items-center gap-2 font-medium wrap-anywhere">
        {children}
      </dd>
    </div>
  );
}

/* 联系方式还没定下来时，每一项旁边标一个"待补充" */
const pending = !contact.ready && (
  <Tag variant="outline" size="sm">
    待补充
  </Tag>
);

export function Contact({
  need,
  onNeedChange,
}: {
  need: Need | null;
  onNeedChange: (need: Need) => void;
}) {
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<"sent" | "not-connected" | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const clear = (key: keyof Errors) =>
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const reach = String(data.get("reach") ?? "").trim();
    const next: Errors = {};
    if (!name) next.name = "请填写称呼，方便我们联系你。";
    if (!reach) {
      next.reach = "请留一个手机号或邮箱，我们才能回复你。";
    } else if (!EMAIL.test(reach) && !isPhone(reach)) {
      next.reach =
        "格式不太对，请填写手机号或邮箱，例如 138 0000 0000 或 name@company.com。";
    }
    if (!data.get("need")) next.need = "请选一个咨询方向，不确定就选“其他”。";
    setErrors(next);
    setResult(null);
    if (Object.keys(next).length > 0) {
      // 焦点移到第一个有问题的字段，读屏会读出它的错误说明。
      // 咨询方向是一组单选：有选中的就落在选中的那个上，没有就落在第一个上
      const first = (["name", "reach", "need"] as const).find(
        (key) => next[key],
      );
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
    setSending(true);
    try {
      setResult(await submitLead(data));
      // 结果就在提交按钮上面：手机上也滚到能看见的地方
      requestAnimationFrame(() =>
        resultRef.current?.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        }),
      );
    } finally {
      setSending(false);
    }
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
          <SectionTitle latin="Contact" meta="// 联系我们">
            预约咨询
          </SectionTitle>
          <p className="max-w-prose text-ink-secondary">
            说说你的业务和想用 AI
            解决的问题，哪怕还只是一个想法。我们会先帮你判断值不值得做、从哪一步开始。
          </p>
          <dl className="mt-2 border-b border-line">
            <ContactRow icon={<MailIcon size={20} />} label="邮箱">
              {contact.email}
              {pending}
            </ContactRow>
            <ContactRow icon={<PhoneIcon size={20} />} label="电话">
              {contact.phone}
              {pending}
            </ContactRow>
            <ContactRow icon={<PinIcon size={20} />} label="地址">
              {contact.address}
            </ContactRow>
            <ContactRow icon={<ClockIcon size={20} />} label="工作时间">
              {contact.hours}
              {pending}
            </ContactRow>
          </dl>
        </div>

        <form
          noValidate
          onSubmit={onSubmit}
          aria-label="咨询表单"
          className="flex min-w-0 flex-col gap-6 sm:border sm:border-line sm:bg-surface-raised sm:p-8"
        >
          <div className="flex flex-col gap-1.5 text-sm text-ink-secondary">
            {!FORM_CONNECTED && (
              <p className="font-medium text-ink">
                咨询表单暂未接通，提交后内容不会发出。
              </p>
            )}
            {/* 每个必填的控件自己会读出"必填"，这句只给看得见记号的人 */}
            <p aria-hidden="true" className="flex items-center">
              带
              <span className="mx-1.5 inline-block size-1.5 rotate-45 bg-accent-ink" />
              的是必填项。
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="称呼" required error={errors.name}>
              <Input
                name="name"
                autoComplete="name"
                placeholder="例如 王先生"
                onChange={() => clear("name")}
              />
            </Field>
            <Field label="公司或组织">
              <Input name="company" autoComplete="organization" />
            </Field>
          </div>
          <Field
            label="手机或邮箱"
            required
            error={errors.reach}
            help="只用来回复这次咨询。"
          >
            <Input
              name="reach"
              autoComplete="email"
              onChange={() => clear("reach")}
            />
          </Field>
          {/* 一组单选：group 让它成为 fieldset + legend */}
          <Field label="咨询方向" required group error={errors.need}>
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
          <Field
            label="需求描述"
            help="业务场景、现有数据、希望什么时候上线，写多少都可以。"
          >
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
            {result === "not-connected" && (
              <Alert role="none" tone="info" title="表单暂未开通">
                {contact.ready ? (
                  <>
                    刚才填写的内容没有发出（已填的内容还在表单里），请发邮件到{" "}
                    {contact.email} 联系我们。
                  </>
                ) : (
                  "官网刚上线，咨询表单还没有接入后台，刚才填写的内容没有发出（已填的内容还在表单里）。正式的联系方式正在补充，公布后会更新在本页。"
                )}
              </Alert>
            )}
            {result === "sent" && (
              <Alert role="none" tone="success" title="已收到">
                我们会尽快通过你留下的方式联系你。
              </Alert>
            )}
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              size="lg"
              loading={sending}
              loadingText="提交中"
            >
              提交咨询
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
