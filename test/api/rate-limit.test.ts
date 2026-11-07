import { expect, test } from "bun:test";
import { clientKey } from "../../api/_lib/rate-limit.js";

test("ipv4 passes through, first forwarded value wins", () => {
  expect(clientKey("1.2.3.4, 5.6.7.8")).toBe("1.2.3.4");
  expect(clientKey("::ffff:1.2.3.4")).toBe("1.2.3.4");
});

test("ipv6 grouped by /64", () => {
  expect(clientKey("2001:db8:1:2:aaaa:bbbb:cccc:dddd")).toBe("2001:db8:1:2::/64");
  expect(clientKey("2001:db8:1:2:1::9")).toBe("2001:db8:1:2::/64");
  expect(clientKey("2001:DB8::1")).toBe("2001:db8:0:0::/64");
});

test("missing ip", () => {
  expect(clientKey(undefined)).toBeUndefined();
  expect(clientKey("")).toBeUndefined();
});

test("brackets, zone id, port and v4-mapped forms", () => {
  expect(clientKey("[2001:db8:1:2::9]:443")).toBe("2001:db8:1:2::/64");
  expect(clientKey("fe80::1%eth0")).toBe("fe80:0:0:0::/64");
  expect(clientKey("1.2.3.4:5678")).toBe("1.2.3.4");
  expect(clientKey("::ffff:1.2.3.4")).toBe("1.2.3.4");
  expect(clientKey("::ffff:102:304")).toBe("1.2.3.4");
  expect(clientKey("garbage")).toBe("garbage");
});
