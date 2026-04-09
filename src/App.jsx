import React, { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const USER_COLOR_PALETTE = [
  { bg: "#2563eb", text: "#ffffff", soft: "#dbeafe" },
  { bg: "#dc2626", text: "#ffffff", soft: "#fee2e2" },
  { bg: "#16a34a", text: "#ffffff", soft: "#dcfce7" },
  { bg: "#9333ea", text: "#ffffff", soft: "#f3e8ff" },
  { bg: "#ea580c", text: "#ffffff", soft: "#ffedd5" },
  { bg: "#0891b2", text: "#ffffff", soft: "#cffafe" },
  { bg: "#be185d", text: "#ffffff", soft: "#fce7f3" },
  { bg: "#4f46e5", text: "#ffffff", soft: "#e0e7ff" },
  { bg: "#65a30d", text: "#ffffff", soft: "#ecfccb" },
  { bg: "#b45309", text: "#ffffff", soft: "#fef3c7" },
  { bg: "#0f766e", text: "#ffffff", soft: "#ccfbf1" },
  { bg: "#7c3aed", text: "#ffffff", soft: "#ede9fe" },
  { bg: "#c2410c", text: "#ffffff", soft: "#ffedd5" },
  { bg: "#1d4ed8", text: "#ffffff", soft: "#dbeafe" },
  { bg: "#15803d", text: "#ffffff", soft: "#dcfce7" },
  { bg: "#a21caf", text: "#ffffff", soft: "#fae8ff" },
];

const translations = {
  zh: {
    language: "🌍语言",
    chinese: "中文",
    english: "English",

    title: "SLU羽毛球报名",
    subtitle: "🏸",

    sectionEntry: "报名/取消通道",
    sectionSummary: "综合统计",
    sectionRange: "选择要报名/取消的时间范围",

    publicEntry: "普通入口",
    priorityEntry: "WhatsApp群成员入口",
    adminEntry: "管理员登录",

    yourName: "你的名字",
    yourNamePlaceholder: "请输入群昵称",
    cancelPin: "4位取消密码",
    cancelPinPlaceholder: "例如 1234",

    pinHint:
      "报名时请自己设置一个4位取消密码。之后如果要取消报名，需要输入相同的名字和密码。",

    priorityinvitationCode: "WhatsApp群报名邀请码",
    invitationCodePlaceholder: "输入邀请码",
    verify: "验证",
    priorityVerified: "邀请码验证通过，可以报名任意未来时间段。",
    priorityNeedVerify: "WhatsApp群成员需要先输入正确邀请码。",

    publicHint: "普通入口在活动开始前的72小时内开放。",

    adminPassword: "管理员密码",
    adminPasswordPlaceholder: "输入管理员密码",
    unlockAdmin: "解锁管理员",
    adminUnlockedHint: "管理员已解锁，可以生成新的半小时 slots。",
    date: "日期",
    capacity: "每格人数",
    startTime: "开始时间",
    endTime: "结束时间",
    generateSlots: "生成半小时 slots",

    loading: "加载中…",
    noBookings: "还没有任何报名记录",
    noSlots:
      "还没有任何时间段。你可以先在上面的管理员入口生成某一天的 slots。",

    currentSelection: "当前选择",
    invalidCurrentRange: "当前时间范围无效",

    signUpRange: "报名这个时间范围",
    cancelRange: "取消这个时间范围",
    rangeFull: "所选范围内有时段已满",

    dbReadError:
      "读取数据库失败，请检查 URL、key 和表设置。\n如果需要，我可以继续帮你排查。",
    noAdminPassword: "数据库里还没有设置管理员密码。",
    adminUnlocked: "管理员已解锁。",
    wrongAdminPassword: "管理员密码错误。",

    noPriorityCode: "数据库里还没有设置邀请码。",
    prioritySuccess: "WhatsApp群成员验证成功。",
    wrongPriorityCode: "邀请码不正确。",

    needName: "请先输入名字。",
    needPin: "请先输入4位数字作为取消密码。",
    needPriorityFirst: "WhatsApp群成员需要先输入正确邀请码。",
    invalidRange: "你选择的开始和结束时间不合法，或者中间缺少半小时段。",
    pastRangeCannotBook:
      "你选择的时间范围里，至少有一个时间段已经开始或已经结束，不能再报名。",
    public72Only:
      "普通入口的报名仅在活动开始前72h内开放。WhatsApp群成员可以提前报名所有timeedit上已预约的时间段。",
    alreadyBooked:
      "你选择的时间范围里，有至少一个半小时段已经报过了。",
    someSlotFull: "你选择的时间范围里，有至少一个半小时段已经满了。",
    signupFailed: "报名失败：{message}",
    signupSuccess:
      "报名成功。\n已为你报名 {date} {start}-{end}。\n请记住你的取消密码：{pin}",

    needPinForCancel: "请输入你报名时设置的4位取消密码。",
    noMatchedBooking:
      "你在这个时间范围里没有找到匹配的报名记录。请检查名字和取消密码是否正确。",
    cancelFailed: "取消失败：{message}",
    cancelSuccess: "已取消 {date} {start}-{end} 范围内的报名。",

    unlockAdminFirst: "请先解锁管理员。",
    fillAdminFields: "管理员生成时间段时，请把日期、开始和结束时间填完整。",
    endMustBeLater: "管理员生成时间段时，结束时间必须晚于开始时间。",
    dateAlreadyHasSlots:
      "这个日期已经有时间段了。为了避免重复，请先不要重复生成同一天。",
    noSlotsGenerated: "没有生成任何时间段，请检查开始和结束时间。",
    generateFailed: "生成失败：{message}",
    generateSuccess: "已成功生成 {date} {start}-{end} 的半小时时段。",

    rangeRuleInvalid: "请选择合法的开始和结束时间。结束时间必须晚于开始时间。",
    rangeRulePast: "不能报名已经开始或已经结束的时间段。",
    rangeRulePriorityVerified:
      "WhatsApp群成员可提前报名任意未来时间段。系统会自动帮你报名 {count} 个半小时段。",
    rangeRulePriorityNeed: "WhatsApp群成员需要先输入正确邀请码。",
    rangeRulePublicOk:
      "普通入口当前可以报名这个范围。系统会自动帮你报名 {count} 个半小时段。",
    rangeRulePublicWait: "普通入口的报名仅在活动开始前72h内开放。",

    unnamed: "未命名",
  },

  en: {
    language: "🌍Language",
    chinese: "中文",
    english: "English",

    title: "SLU Badminton Sign-up",
    subtitle: "🏸",

    sectionEntry: "Sign-up / Cancellation",
    sectionSummary: "Overview",
    sectionRange: "Select a time range to sign up / cancel",

    publicEntry: "Public",
    priorityEntry: "WhatsApp Members",
    adminEntry: "Admin",

    yourName: "Your name",
    yourNamePlaceholder: "Enter your group nickname",
    cancelPin: "4-digit cancellation PIN",
    cancelPinPlaceholder: "e.g. 1234",

    pinHint:
      "Please set your own 4-digit cancellation PIN when signing up. If you want to cancel later, you will need to enter the same name and PIN.",

    priorityinvitationCode: "WhatsApp invitation code",
    invitationCodePlaceholder: "Enter invitation code",
    verify: "Verify",
    priorityVerified:
      "invitation code verified. You can sign up for any future time range.",
    priorityNeedVerify:
      "WhatsApp members need to enter the correct invitation code first.",

    publicHint:
      "The public entry opens only within 72 hours before the activity starts.",

    adminPassword: "Admin password",
    adminPasswordPlaceholder: "Enter admin password",
    unlockAdmin: "Unlock Admin",
    adminUnlockedHint:
      "Admin unlocked. You can now generate new half-hour slots.",
    date: "Date",
    capacity: "Capacity per slot",
    startTime: "Start time",
    endTime: "End time",
    generateSlots: "Generate half-hour slots",

    loading: "Loading…",
    noBookings: "No sign-up records yet",
    noSlots:
      "There are no time slots yet. You can generate slots for a date using the admin section above.",

    currentSelection: "Current selection",
    invalidCurrentRange: "Current time range is invalid",

    signUpRange: "Sign up for this range",
    cancelRange: "Cancel this range",
    rangeFull: "At least one slot in this range is full",

    dbReadError:
      "Failed to read from the database. Please check the URL, key, and table settings.\nIf needed, I can help you troubleshoot further.",
    noAdminPassword: "No admin password has been set in the database yet.",
    adminUnlocked: "Admin unlocked.",
    wrongAdminPassword: "Incorrect admin password.",

    noPriorityCode: "No invitation code has been set in the database yet.",
    prioritySuccess: "WhatsApp member verification successful.",
    wrongPriorityCode: "Incorrect invitation code.",

    needName: "Please enter your name first.",
    needPin: "Please enter a 4-digit number as your cancellation PIN first.",
    needPriorityFirst:
      "WhatsApp members need to enter the correct invitation code first.",
    invalidRange:
      "The selected start and end times are invalid, or there is a missing half-hour slot in between.",
    pastRangeCannotBook:
      "At least one slot in your selected range has already started or ended, so it can no longer be booked.",
    public72Only:
      "Public entry can only book slots within the next 72 hours. WhatsApp members can book farther into the future.",
    alreadyBooked:
      "At least one half-hour slot in your selected range has already been booked by you.",
    someSlotFull:
      "At least one half-hour slot in your selected range is already full.",
    signupFailed: "Sign-up failed: {message}",
    signupSuccess:
      "Sign-up successful.\nYou have been registered for {date} {start}-{end}.\nPlease remember your cancellation PIN: {pin}",

    needPinForCancel:
      "Please enter the same 4-digit cancellation PIN you used when signing up.",
    noMatchedBooking:
      "No matching booking record was found in this range. Please check whether your name and cancellation PIN are correct.",
    cancelFailed: "Cancellation failed: {message}",
    cancelSuccess: "Cancelled bookings in {date} {start}-{end}.",

    unlockAdminFirst: "Please unlock admin first.",
    fillAdminFields:
      "When generating slots as admin, please fill in the date, start time, and end time.",
    endMustBeLater:
      "When generating slots as admin, the end time must be later than the start time.",
    dateAlreadyHasSlots:
      "This date already has slots. To avoid duplicates, please do not generate the same day again.",
    noSlotsGenerated:
      "No slots were generated. Please check the start and end times.",
    generateFailed: "Generation failed: {message}",
    generateSuccess:
      "Successfully generated half-hour slots for {date} {start}-{end}.",

    rangeRuleInvalid:
      "Please select a valid start and end time. The end time must be later than the start time.",
    rangeRulePast:
      "You cannot book slots that have already started or ended.",
    rangeRulePriorityVerified:
      "WhatsApp members can book any future time range in advance. The system will automatically sign you up for {count} half-hour slot(s).",
    rangeRulePriorityNeed:
      "WhatsApp members need to enter the correct invitation code first.",
    rangeRulePublicOk:
      "Public entry can currently book this range. The system will automatically sign you up for {count} half-hour slot(s).",
    rangeRulePublicWait:
      "Public entry can only book slots within the next 72 hours.",

    unnamed: "Unnamed",
  },
};

function formatText(template, vars = {}) {
  return String(template).replace(/\{(\w+)\}/g, (_, key) =>
    vars[key] !== undefined ? String(vars[key]) : ""
  );
}

function formatTime(value) {
  return String(value || "").slice(0, 5);
}

function getUniqueDates(slots) {
  return [...new Set(slots.map((s) => s.date))].sort();
}

function getSlotStartDateTime(slot) {
  return new Date(`${slot.date}T${slot.start_time}`);
}

function isFutureSlot(slot) {
  return getSlotStartDateTime(slot).getTime() > Date.now();
}

function isWithinNext72Hours(slot) {
  const diffMs = getSlotStartDateTime(slot).getTime() - Date.now();
  return diffMs > 0 && diffMs <= 72 * 60 * 60 * 1000;
}

function getDateTimes(slots, date) {
  const daySlots = slots
    .filter((s) => s.date === date)
    .sort((a, b) => sTime(a).localeCompare(sTime(b)));

  return {
    startTimes: [...new Set(daySlots.map((s) => s.start_time))],
    endTimes: [...new Set(daySlots.map((s) => s.end_time))],
  };
}

function sTime(slot) {
  return slot.start_time;
}

function getSlotsInRange(slots, date, startTime, endTime) {
  return slots
    .filter(
      (s) =>
        s.date === date &&
        s.start_time >= startTime &&
        s.end_time <= endTime
    )
    .sort((a, b) => a.start_time.localeCompare(b.start_time));
}

function areContiguous(selectedSlots, startTime, endTime) {
  if (!selectedSlots.length) return false;
  if (selectedSlots[0].start_time !== startTime) return false;
  if (selectedSlots[selectedSlots.length - 1].end_time !== endTime) return false;

  for (let i = 0; i < selectedSlots.length - 1; i += 1) {
    if (selectedSlots[i].end_time !== selectedSlots[i + 1].start_time) {
      return false;
    }
  }
  return true;
}

function timeToMinutes(timeStr) {
  const [h, m] = String(timeStr).slice(0, 5).split(":").map(Number);
  return h * 60 + m;
}

function mergeContinuousRanges(ranges) {
  if (!ranges.length) return [];
  const sorted = [...ranges].sort((a, b) => a.start.localeCompare(b.start));
  const merged = [{ ...sorted[0] }];

  for (let i = 1; i < sorted.length; i += 1) {
    const current = sorted[i];
    const last = merged[merged.length - 1];
    if (last.end === current.start) {
      last.end = current.end;
    } else {
      merged.push({ ...current });
    }
  }
  return merged;
}

function normalizeName(name) {
  return String(name || "").trim().toLowerCase();
}

function getColorIndexFromName(name) {
  const str = normalizeName(name);
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash * 31 + str.charCodeAt(i)) % 2147483647;
  }
  return hash % USER_COLOR_PALETTE.length;
}

function getUserColor(name) {
  return USER_COLOR_PALETTE[getColorIndexFromName(name)];
}

function buildTimelineSummary(slots, bookings, unnamedLabel) {
  const slotMap = new Map(slots.map((slot) => [slot.id, slot]));
  const byDate = {};

  for (const booking of bookings) {
    const slot = slotMap.get(booking.slot_id);
    if (!slot) continue;

    const date = slot.date;
    const name = (booking.name || "").trim() || unnamedLabel;

    if (!byDate[date]) byDate[date] = {};
    if (!byDate[date][name]) byDate[date][name] = [];

    byDate[date][name].push({
      start: formatTime(slot.start_time),
      end: formatTime(slot.end_time),
    });
  }

  return Object.entries(byDate)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, people]) => {
      const personEntries = Object.entries(people)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([name, ranges]) => {
          const merged = mergeContinuousRanges(ranges);
          return { name, ranges: merged };
        });

      const allMinutes = [];
      personEntries.forEach((person) => {
        person.ranges.forEach((r) => {
          allMinutes.push(timeToMinutes(r.start));
          allMinutes.push(timeToMinutes(r.end));
        });
      });

      let minMinute = allMinutes.length ? Math.min(...allMinutes) : 17 * 60;
      let maxMinute = allMinutes.length ? Math.max(...allMinutes) : 20 * 60;

      const roundedMin = Math.floor(minMinute / 30) * 30;
      const roundedMax = Math.ceil(maxMinute / 30) * 30;

      const ticks = [];
      for (let t = roundedMin; t <= roundedMax; t += 30) {
        const hh = String(Math.floor(t / 60)).padStart(2, "0");
        const mm = String(t % 60).padStart(2, "0");
        ticks.push(`${hh}:${mm}`);
      }

      return {
        date,
        people: personEntries,
        minMinute: roundedMin,
        maxMinute: roundedMax,
        totalMinutes: Math.max(roundedMax - roundedMin, 30),
        ticks,
      };
    });
}

function getStyles(isMobile, isTablet) {
  const nameColWidth = isMobile ? 72 : isTablet ? 82 : 94;
  const timelineMinWidth = isMobile ? 520 : 0;

  return {
    page: {
      minHeight: "100vh",
      background: "#f5f7fb",
      padding: isMobile ? 10 : 16,
      fontFamily: "Arial, sans-serif",
      color: "#1f2937",
      boxSizing: "border-box",
    },
    container: {
      maxWidth: 1320,
      margin: "0 auto",
      display: "grid",
      gap: isMobile ? 10 : 14,
    },
    headerRow: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    languageBox: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      background: "white",
      borderRadius: 12,
      padding: isMobile ? "7px 9px" : "8px 10px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      width: "fit-content",
      maxWidth: "100%",
      flexWrap: "wrap",
    },
    languageLabel: {
      fontSize: isMobile ? 12 : 13,
      fontWeight: 600,
      color: "#374151",
    },
    languageSelect: {
      border: "1px solid #d1d5db",
      borderRadius: 8,
      padding: isMobile ? "6px 8px" : "6px 8px",
      fontSize: isMobile ? 12 : 13,
      background: "white",
      maxWidth: "100%",
    },
    headerBlock: {
      marginBottom: 2,
      textAlign: isMobile ? "center" : "left",
    },
    title: {
      margin: 0,
      fontSize: isMobile ? 24 : 30,
      lineHeight: 1.2,
      wordBreak: "break-word",
    },
    subtitle: {
      marginTop: 4,
      marginBottom: 0,
      color: "#6b7280",
      fontSize: isMobile ? 13 : 14,
    },
    card: {
      background: "white",
      borderRadius: isMobile ? 12 : 14,
      padding: isMobile ? 12 : 16,
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      overflow: "hidden",
    },
    sectionTitle: {
      marginTop: 0,
      marginBottom: 12,
      fontSize: isMobile ? 17 : 18,
      lineHeight: 1.3,
    },
    tabRow: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap",
      marginBottom: 14,
    },
    rowWrap: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      alignItems: "center",
      flexDirection: isMobile ? "column" : "row",
    },
    rowWrapNoStack: {
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      alignItems: "center",
    },
    entryPanel: {
      display: "grid",
      gap: 10,
    },
    stackedSections: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: isMobile ? 10 : 14,
      alignItems: "start",
    },
    grid2: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: 10,
    },
    grid3: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
      gap: 10,
    },
    grid4: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : isTablet
          ? "repeat(2, 1fr)"
          : "repeat(4, 1fr)",
      gap: 10,
    },
    inputBlock: {
      display: "grid",
      gap: 6,
      minWidth: 0,
    },
    label: {
      fontWeight: 600,
      fontSize: isMobile ? 13 : 14,
      lineHeight: 1.3,
    },
    input: {
      width: "100%",
      minWidth: 0,
      padding: isMobile ? "10px 10px" : "9px 10px",
      borderRadius: 10,
      border: "1px solid #d1d5db",
      fontSize: isMobile ? 16 : 14,
      background: "white",
      boxSizing: "border-box",
    },
    primaryButton: {
      border: "none",
      background: "#111827",
      color: "white",
      padding: isMobile ? "11px 14px" : "10px 14px",
      borderRadius: 10,
      cursor: "pointer",
      fontSize: isMobile ? 14 : 14,
      width: isMobile ? "100%" : "auto",
      minHeight: 42,
    },
    secondaryButton: {
      border: "1px solid #d1d5db",
      background: "white",
      color: "#111827",
      padding: isMobile ? "11px 14px" : "10px 14px",
      borderRadius: 10,
      cursor: "pointer",
      fontSize: isMobile ? 14 : 14,
      width: isMobile ? "100%" : "auto",
      minHeight: 42,
    },
    disabledButton: {
      border: "none",
      background: "#9ca3af",
      color: "white",
      padding: isMobile ? "11px 14px" : "10px 14px",
      borderRadius: 10,
      cursor: "not-allowed",
      fontSize: isMobile ? 14 : 14,
      width: isMobile ? "100%" : "auto",
      minHeight: 42,
    },
    hint: {
      marginTop: 6,
      color: "#6b7280",
      fontSize: isMobile ? 12 : 13,
      lineHeight: 1.5,
      wordBreak: "break-word",
    },
    message: {
      whiteSpace: "pre-wrap",
      background: "#eef2ff",
      border: "1px solid #c7d2fe",
      borderRadius: 12,
      padding: isMobile ? 11 : 12,
      fontSize: isMobile ? 13 : 14,
      lineHeight: 1.5,
      wordBreak: "break-word",
    },
    rangeBox: {
      marginTop: 14,
      marginBottom: 14,
      padding: isMobile ? 10 : 12,
      borderRadius: 12,
      background: "#f9fafb",
      border: "1px solid #e5e7eb",
    },
    rangeTitle: {
      fontWeight: 700,
      marginBottom: 4,
      fontSize: isMobile ? 13 : 14,
    },
    rangeText: {
      fontSize: isMobile ? 18 : 17,
      fontWeight: 700,
      lineHeight: 1.35,
      wordBreak: "break-word",
    },
    adminUnlockRow: {
      display: "flex",
      gap: 12,
      alignItems: "end",
      flexWrap: "wrap",
      flexDirection: isMobile ? "column" : "row",
    },
    adminButtonWrap: {
      display: "flex",
      alignItems: "end",
      width: isMobile ? "100%" : "auto",
    },
    timelineDayList: {
      display: "grid",
      gap: 12,
      maxHeight: isMobile ? "none" : 520,
      overflowY: isMobile ? "visible" : "auto",
    },
    timelineDayCard: {
      border: "1px solid #e5e7eb",
      borderRadius: 12,
      padding: isMobile ? 10 : 12,
      background: "#fafafa",
      overflowX: "auto",
    },
    timelineDayTitle: {
      fontWeight: 700,
      marginBottom: 10,
      fontSize: isMobile ? 14 : 15,
    },
    timelineTable: {
      minWidth: timelineMinWidth,
    },
    timelineHeader: {
      display: "grid",
      gridTemplateColumns: `${nameColWidth}px 1fr`,
      gap: isMobile ? 8 : 10,
      alignItems: "center",
      marginBottom: 8,
    },
    timelineNameColumn: {},
    timelineAxis: {
      display: "flex",
      justifyContent: "space-between",
      position: "relative",
      fontSize: isMobile ? 10 : 11,
      color: "#6b7280",
    },
    timelineTick: {
      textAlign: "left",
      whiteSpace: "nowrap",
    },
    timelineRows: {
      display: "grid",
      gap: 8,
    },
    timelineRow: {
      display: "grid",
      gridTemplateColumns: `${nameColWidth}px 1fr`,
      gap: isMobile ? 8 : 10,
      alignItems: "center",
    },
    timelinePersonName: {
      fontSize: isMobile ? 12 : 13,
      fontWeight: 700,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      borderRadius: 999,
      padding: isMobile ? "6px 8px" : "6px 10px",
      boxSizing: "border-box",
    },
    timelineTrack: {
      position: "relative",
      height: isMobile ? 30 : 28,
      borderRadius: 999,
      background:
        "repeating-linear-gradient(to right, #eef2f7 0, #eef2f7 calc(16.666% - 1px), #dbe3ee calc(16.666% - 1px), #dbe3ee 16.666%)",
      overflow: "hidden",
    },
    timelineBar: {
      position: "absolute",
      top: isMobile ? 4 : 3,
      height: isMobile ? 22 : 22,
      borderRadius: 999,
      color: "white",
      fontSize: isMobile ? 10 : 11,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      padding: "0 8px",
      boxSizing: "border-box",
    },
    empty: {
      color: "#6b7280",
      fontSize: isMobile ? 13 : 14,
      lineHeight: 1.5,
    },
  };
}

export default function App() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("badminton_lang") || "zh";
  });

  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const [slots, setSlots] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [deletePin, setDeletePin] = useState("");

  const [entryMode, setEntryMode] = useState("public");
  const [priorityCodeInput, setPriorityCodeInput] = useState("");
  const [priorityUnlocked, setPriorityUnlocked] = useState(false);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");

  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminDate, setAdminDate] = useState("");
  const [adminStart, setAdminStart] = useState("17:00");
  const [adminEnd, setAdminEnd] = useState("20:00");
  const [adminCapacity, setAdminCapacity] = useState(8);

  const isMobile = viewportWidth <= 768;
  const isTablet = viewportWidth > 768 && viewportWidth <= 1024;
  const styles = useMemo(() => getStyles(isMobile, isTablet), [isMobile, isTablet]);

  const dict = translations[language] || translations.zh;
  const t = (key, vars) => formatText(dict[key] || key, vars);

  useEffect(() => {
    localStorage.setItem("badminton_lang", language);
  }, [language]);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    setMessage("");

    const [slotRes, bookingRes, settingsRes] = await Promise.all([
      supabase
        .from("slots")
        .select("*")
        .order("date", { ascending: true })
        .order("start_time", { ascending: true }),
      supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: true }),
      supabase.from("settings").select("*").eq("id", 1).single(),
    ]);

    if (slotRes.error || bookingRes.error || settingsRes.error) {
      setMessage(t("dbReadError"));
      setLoading(false);
      return;
    }

    setSlots(slotRes.data || []);
    setBookings(bookingRes.data || []);
    setSettings(settingsRes.data || null);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const dates = useMemo(() => getUniqueDates(slots), [slots]);
  const { startTimes, endTimes } = useMemo(
    () => getDateTimes(slots, selectedDate),
    [slots, selectedDate]
  );

  useEffect(() => {
    if (!selectedDate && dates.length) {
      setSelectedDate(dates[0]);
    }
  }, [dates, selectedDate]);

  useEffect(() => {
    if (!selectedDate) return;

    if (startTimes.length && !startTimes.includes(selectedStartTime)) {
      setSelectedStartTime(startTimes[0]);
    }

    if (endTimes.length && !endTimes.includes(selectedEndTime)) {
      setSelectedEndTime(endTimes[endTimes.length - 1]);
    }
  }, [selectedDate, startTimes, endTimes, selectedStartTime, selectedEndTime]);

  const groupedBookings = useMemo(() => {
    const map = {};
    for (const booking of bookings) {
      if (!map[booking.slot_id]) map[booking.slot_id] = [];
      map[booking.slot_id].push(booking);
    }
    return map;
  }, [bookings]);

  const selectedRangeSlots = useMemo(() => {
    if (!selectedDate || !selectedStartTime || !selectedEndTime) return [];
    return getSlotsInRange(slots, selectedDate, selectedStartTime, selectedEndTime);
  }, [slots, selectedDate, selectedStartTime, selectedEndTime]);

  const selectedRangeIsValid = useMemo(() => {
    if (!selectedDate || !selectedStartTime || !selectedEndTime) return false;
    if (selectedStartTime >= selectedEndTime) return false;
    return areContiguous(selectedRangeSlots, selectedStartTime, selectedEndTime);
  }, [selectedDate, selectedStartTime, selectedEndTime, selectedRangeSlots]);

  const rangeStatus = useMemo(() => {
    const result = {
      slots: 0,
      full: false,
      allFuture: false,
      publicEligible: false,
    };

    if (!selectedRangeIsValid) return result;

    result.slots = selectedRangeSlots.length;
    result.allFuture = selectedRangeSlots.every((slot) => isFutureSlot(slot));
    result.publicEligible = selectedRangeSlots.every((slot) =>
      isWithinNext72Hours(slot)
    );
    result.full = selectedRangeSlots.some((slot) => {
      const slotBookings = groupedBookings[slot.id] || [];
      return slotBookings.length >= slot.capacity;
    });

    return result;
  }, [selectedRangeIsValid, selectedRangeSlots, groupedBookings]);

  const timelineSummary = useMemo(() => {
    return buildTimelineSummary(slots, bookings, t("unnamed"));
  }, [slots, bookings, language]);

  const unlockAdmin = () => {
    if (!settings?.admin_password) {
      setMessage(t("noAdminPassword"));
      return;
    }

    if (adminPasswordInput === settings.admin_password) {
      setAdminUnlocked(true);
      setEntryMode("admin");
      setMessage(t("adminUnlocked"));
    } else {
      setAdminUnlocked(false);
      setMessage(t("wrongAdminPassword"));
    }
  };

  const tryPriorityCode = () => {
    if (!settings?.priority_code) {
      setMessage(t("noPriorityCode"));
      return;
    }

    if (priorityCodeInput.trim() === settings.priority_code) {
      setPriorityUnlocked(true);
      setEntryMode("priority");
      setMessage(t("prioritySuccess"));
    } else {
      setPriorityUnlocked(false);
      setMessage(t("wrongPriorityCode"));
    }
  };

  const signUpRange = async () => {
    const cleanName = name.trim();
    if (!cleanName) {
      setMessage(t("needName"));
      return;
    }

    if (!/^\d{4}$/.test(deletePin)) {
      setMessage(t("needPin"));
      return;
    }

    if (entryMode === "priority" && !priorityUnlocked) {
      setMessage(t("needPriorityFirst"));
      return;
    }

    if (!selectedRangeIsValid) {
      setMessage(t("invalidRange"));
      return;
    }

    if (!rangeStatus.allFuture) {
      setMessage(t("pastRangeCannotBook"));
      return;
    }

    if (entryMode === "public" && !rangeStatus.publicEligible) {
      setMessage(t("public72Only"));
      return;
    }

    const alreadyBookedAny = selectedRangeSlots.some((slot) => {
      const slotBookings = groupedBookings[slot.id] || [];
      return slotBookings.some(
        (b) => b.name.trim().toLowerCase() === cleanName.toLowerCase()
      );
    });

    if (alreadyBookedAny) {
      setMessage(t("alreadyBooked"));
      return;
    }

    if (rangeStatus.full) {
      setMessage(t("someSlotFull"));
      return;
    }

    const rows = selectedRangeSlots.map((slot) => ({
      slot_id: slot.id,
      name: cleanName,
      entry_type: entryMode,
      delete_pin: deletePin,
    }));

    const { error } = await supabase.from("bookings").insert(rows);
    if (error) {
      setMessage(t("signupFailed", { message: error.message }));
      return;
    }

    setMessage(
      t("signupSuccess", {
        date: selectedDate,
        start: formatTime(selectedStartTime),
        end: formatTime(selectedEndTime),
        pin: deletePin,
      })
    );
    await fetchAll();
  };

  const cancelRange = async () => {
    const cleanName = name.trim();
    if (!cleanName) {
      setMessage(t("needName"));
      return;
    }

    if (!/^\d{4}$/.test(deletePin)) {
      setMessage(t("needPinForCancel"));
      return;
    }

    if (!selectedRangeIsValid) {
      setMessage(t("invalidRange"));
      return;
    }

    const targetBookingIds = selectedRangeSlots
      .flatMap((slot) => groupedBookings[slot.id] || [])
      .filter(
        (b) =>
          b.name.trim().toLowerCase() === cleanName.toLowerCase() &&
          String(b.delete_pin || "") === deletePin
      )
      .map((b) => b.id);

    if (!targetBookingIds.length) {
      setMessage(t("noMatchedBooking"));
      return;
    }

    const { error } = await supabase
      .from("bookings")
      .delete()
      .in("id", targetBookingIds);

    if (error) {
      setMessage(t("cancelFailed", { message: error.message }));
      return;
    }

    setMessage(
      t("cancelSuccess", {
        date: selectedDate,
        start: formatTime(selectedStartTime),
        end: formatTime(selectedEndTime),
      })
    );
    await fetchAll();
  };

  const generateSlots = async () => {
    if (!adminUnlocked) {
      setMessage(t("unlockAdminFirst"));
      return;
    }

    if (!adminDate || !adminStart || !adminEnd) {
      setMessage(t("fillAdminFields"));
      return;
    }

    if (adminStart >= adminEnd) {
      setMessage(t("endMustBeLater"));
      return;
    }

    const existingForDate = slots.filter((s) => s.date === adminDate);
    if (existingForDate.length > 0) {
      setMessage(t("dateAlreadyHasSlots"));
      return;
    }

    const inserts = [];
    let current = new Date(`${adminDate}T${adminStart}:00`);
    const end = new Date(`${adminDate}T${adminEnd}:00`);

    while (current < end) {
      const next = new Date(current);
      next.setMinutes(next.getMinutes() + 30);
      if (next > end) break;

      inserts.push({
        date: adminDate,
        start_time: current.toTimeString().slice(0, 8),
        end_time: next.toTimeString().slice(0, 8),
        capacity: Number(adminCapacity),
      });

      current = next;
    }

    if (!inserts.length) {
      setMessage(t("noSlotsGenerated"));
      return;
    }

    const { error } = await supabase.from("slots").insert(inserts);
    if (error) {
      setMessage(t("generateFailed", { message: error.message }));
      return;
    }

    setMessage(
      t("generateSuccess", {
        date: adminDate,
        start: adminStart,
        end: adminEnd,
      })
    );
    await fetchAll();
  };

  const selectedRangeRuleText = (() => {
    if (!selectedRangeIsValid) {
      return t("rangeRuleInvalid");
    }
    if (!rangeStatus.allFuture) {
      return t("rangeRulePast");
    }
    if (entryMode === "priority") {
      return priorityUnlocked
        ? t("rangeRulePriorityVerified", { count: rangeStatus.slots })
        : t("rangeRulePriorityNeed");
    }
    return rangeStatus.publicEligible
      ? t("rangeRulePublicOk", { count: rangeStatus.slots })
      : t("rangeRulePublicWait");
  })();

  const rangeSummary = selectedRangeIsValid
    ? `${selectedDate} ${formatTime(selectedStartTime)}-${formatTime(
        selectedEndTime
      )}`
    : t("invalidCurrentRange");

  const canSubmitCurrentRange =
    selectedRangeIsValid &&
    rangeStatus.allFuture &&
    !rangeStatus.full &&
    /^\d{4}$/.test(deletePin) &&
    (
      entryMode === "priority"
        ? priorityUnlocked
        : entryMode === "public"
          ? rangeStatus.publicEligible
          : false
    );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <div style={styles.languageBox}>
            <label style={styles.languageLabel}>{t("language")}</label>
            <select
              style={styles.languageSelect}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="zh">{t("chinese")}</option>
              <option value="en">{t("english")}</option>
            </select>
          </div>
        </div>

        <div style={styles.headerBlock}>
          <h1 style={styles.title}>{t("title")}</h1>
          <p style={styles.subtitle}>{t("subtitle")}</p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>{t("sectionEntry")}</h2>

          <div style={styles.tabRow}>
            <button
              style={entryMode === "public" ? styles.primaryButton : styles.secondaryButton}
              onClick={() => setEntryMode("public")}
            >
              {t("publicEntry")}
            </button>
            <button
              style={entryMode === "priority" ? styles.primaryButton : styles.secondaryButton}
              onClick={() => setEntryMode("priority")}
            >
              {t("priorityEntry")}
            </button>
            <button
              style={entryMode === "admin" ? styles.primaryButton : styles.secondaryButton}
              onClick={() => setEntryMode("admin")}
            >
              {t("adminEntry")}
            </button>
          </div>

          {entryMode !== "admin" ? (
            <div style={styles.entryPanel}>
              <div style={styles.grid2}>
                <div style={styles.inputBlock}>
                  <label style={styles.label}>{t("yourName")}</label>
                  <input
                    style={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("yourNamePlaceholder")}
                  />
                </div>

                <div style={styles.inputBlock}>
                  <label style={styles.label}>{t("cancelPin")}</label>
                  <input
                    style={styles.input}
                    value={deletePin}
                    onChange={(e) =>
                      setDeletePin(e.target.value.replace(/\D/g, "").slice(0, 4))
                    }
                    placeholder={t("cancelPinPlaceholder")}
                    inputMode="numeric"
                  />
                </div>
              </div>

              <div style={styles.hint}>{t("pinHint")}</div>

              {entryMode === "priority" ? (
                <div style={{ marginTop: 12 }}>
                  <div style={styles.inputBlock}>
                    <label style={styles.label}>{t("priorityinvitationCode")}</label>
                    <div style={styles.rowWrap}>
                      <input
                        style={styles.input}
                        value={priorityCodeInput}
                        onChange={(e) => setPriorityCodeInput(e.target.value)}
                        placeholder={t("invitationCodePlaceholder")}
                      />
                      <button style={styles.primaryButton} onClick={tryPriorityCode}>
                        {t("verify")}
                      </button>
                    </div>
                    <div style={styles.hint}>
                      {priorityUnlocked
                        ? t("priorityVerified")
                        : t("priorityNeedVerify")}
                    </div>
                  </div>
                </div>
              ) : (
                <div style={styles.hint}>{t("publicHint")}</div>
              )}
            </div>
          ) : (
            <div style={styles.entryPanel}>
              {!adminUnlocked ? (
                <>
                  <div style={styles.adminUnlockRow}>
                    <div style={{ ...styles.inputBlock, flex: 1, width: isMobile ? "100%" : "auto" }}>
                      <label style={styles.label}>{t("adminPassword")}</label>
                      <input
                        type="password"
                        value={adminPasswordInput}
                        onChange={(e) => setAdminPasswordInput(e.target.value)}
                        style={styles.input}
                        placeholder={t("adminPasswordPlaceholder")}
                      />
                    </div>

                    <div style={styles.adminButtonWrap}>
                      <button style={styles.primaryButton} onClick={unlockAdmin}>
                        {t("unlockAdmin")}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div style={styles.hint}>{t("adminUnlockedHint")}</div>

                  <div style={styles.grid4}>
                    <div style={styles.inputBlock}>
                      <label style={styles.label}>{t("date")}</label>
                      <input
                        style={styles.input}
                        type="date"
                        value={adminDate}
                        onChange={(e) => setAdminDate(e.target.value)}
                      />
                    </div>

                    <div style={styles.inputBlock}>
                      <label style={styles.label}>{t("capacity")}</label>
                      <input
                        style={styles.input}
                        type="number"
                        min="1"
                        value={adminCapacity}
                        onChange={(e) => setAdminCapacity(e.target.value)}
                      />
                    </div>

                    <div style={styles.inputBlock}>
                      <label style={styles.label}>{t("startTime")}</label>
                      <input
                        style={styles.input}
                        type="time"
                        value={adminStart}
                        onChange={(e) => setAdminStart(e.target.value)}
                      />
                    </div>

                    <div style={styles.inputBlock}>
                      <label style={styles.label}>{t("endTime")}</label>
                      <input
                        style={styles.input}
                        type="time"
                        value={adminEnd}
                        onChange={(e) => setAdminEnd(e.target.value)}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <button style={styles.primaryButton} onClick={generateSlots}>
                      {t("generateSlots")}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div style={styles.stackedSections}>
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>{t("sectionRange")}</h2>

            {loading ? (
              <div>{t("loading")}</div>
            ) : !dates.length ? (
              <div>{t("noSlots")}</div>
            ) : (
              <>
                <div style={styles.grid3}>
                  <div style={styles.inputBlock}>
                    <label style={styles.label}>{t("date")}</label>
                    <select
                      style={styles.input}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    >
                      {dates.map((date) => (
                        <option key={date} value={date}>
                          {date}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.inputBlock}>
                    <label style={styles.label}>{t("startTime")}</label>
                    <select
                      style={styles.input}
                      value={selectedStartTime}
                      onChange={(e) => setSelectedStartTime(e.target.value)}
                    >
                      {startTimes.map((time) => (
                        <option key={time} value={time}>
                          {formatTime(time)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.inputBlock}>
                    <label style={styles.label}>{t("endTime")}</label>
                    <select
                      style={styles.input}
                      value={selectedEndTime}
                      onChange={(e) => setSelectedEndTime(e.target.value)}
                    >
                      {endTimes.map((time) => (
                        <option key={time} value={time}>
                          {formatTime(time)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={styles.rangeBox}>
                  <div style={styles.rangeTitle}>{t("currentSelection")}</div>
                  <div style={styles.rangeText}>{rangeSummary}</div>
                  <div style={styles.hint}>{selectedRangeRuleText}</div>
                </div>

                <div style={styles.rowWrap}>
                  <button
                    style={
                      canSubmitCurrentRange
                        ? styles.primaryButton
                        : styles.disabledButton
                    }
                    onClick={signUpRange}
                    disabled={!canSubmitCurrentRange}
                  >
                    {rangeStatus.full ? t("rangeFull") : t("signUpRange")}
                  </button>

                  <button style={styles.secondaryButton} onClick={cancelRange}>
                    {t("cancelRange")}
                  </button>
                </div>
              </>
            )}
          </div>

          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>{t("sectionSummary")}</h2>

            {loading ? (
              <div>{t("loading")}</div>
            ) : timelineSummary.length === 0 ? (
              <div style={styles.empty}>{t("noBookings")}</div>
            ) : (
              <div style={styles.timelineDayList}>
                {timelineSummary.map((day) => (
                  <div key={day.date} style={styles.timelineDayCard}>
                    <div style={styles.timelineDayTitle}>{day.date}</div>

                    <div style={styles.timelineTable}>
                      <div style={styles.timelineHeader}>
                        <div style={styles.timelineNameColumn}></div>
                        <div style={styles.timelineAxis}>
                          {day.ticks.map((tick) => (
                            <div
                              key={tick}
                              style={{
                                ...styles.timelineTick,
                                width: `${100 / Math.max(day.ticks.length - 1, 1)}%`,
                              }}
                            >
                              {tick}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div style={styles.timelineRows}>
                        {day.people.map((person) => {
                          const userColor = getUserColor(person.name);

                          return (
                            <div key={person.name} style={styles.timelineRow}>
                              <div
                                style={{
                                  ...styles.timelinePersonName,
                                  color: userColor.bg,
                                  background: userColor.soft,
                                  border: `1px solid ${userColor.bg}22`,
                                }}
                                title={person.name}
                              >
                                {person.name}
                              </div>

                              <div style={styles.timelineTrack}>
                                {person.ranges.map((range, idx) => {
                                  const startMinute = timeToMinutes(range.start);
                                  const endMinute = timeToMinutes(range.end);
                                  const left =
                                    ((startMinute - day.minMinute) / day.totalMinutes) * 100;
                                  const width =
                                    ((endMinute - startMinute) / day.totalMinutes) * 100;

                                  return (
                                    <div
                                      key={`${person.name}-${idx}`}
                                      style={{
                                        ...styles.timelineBar,
                                        left: `${left}%`,
                                        width: `${width}%`,
                                        background: userColor.bg,
                                        color: userColor.text,
                                        boxShadow: `0 1px 4px ${userColor.bg}44`,
                                      }}
                                      title={`${person.name}: ${range.start}-${range.end}`}
                                    >
                                      {range.start}-{range.end}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {message && <div style={styles.message}>{message}</div>}
      </div>
    </div>
  );
}