// author: Brandon Nguyen

import { rankItem, rankings } from "@tanstack/match-sorter-utils";

const fuzzy = (row, columnId, filterValue, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), filterValue, {
    threshold: rankings.MATCHES,
  });
  addMeta(itemRank);
  return itemRank.passed;
};

fuzzy.autoRemove = (val) => !val;

const contains = (row, id, filterValue) =>
  row
    .getValue(id)
    ?.toString()
    .toLowerCase()
    .trim()
    .includes(filterValue?.toString().toLowerCase().trim());

contains.autoRemove = (val) => !val;

const startsWith = (row, id, filterValue) =>
  row
    .getValue(id)
    ?.toString()
    .toLowerCase()
    .trim()
    .startsWith(filterValue?.toString().toLowerCase().trim());

startsWith.autoRemove = (val) => !val;

const endsWith = (row, id, filterValue) =>
  row
    .getValue(id)
    ?.toString()
    .toLowerCase()
    .trim()
    .endsWith(filterValue?.toString().toLowerCase().trim());

endsWith.autoRemove = (val) => !val;

const equals = (row, id, filterValue) =>
  row.getValue(id)?.toString().toLowerCase().trim() ===
  filterValue?.toString().toLowerCase().trim();

equals.autoRemove = (val) => !val;

const notEquals = (row, id, filterValue) =>
  row.getValue(id)?.toString().toLowerCase().trim() !==
  filterValue?.toString().toLowerCase().trim();

notEquals.autoRemove = (val) => !val;

const greaterThan = (row, id, filterValue) =>
  !isNaN(+filterValue) && !isNaN(+row.getValue(id))
    ? +row.getValue(id) > +filterValue
    : row.getValue(id)?.toString().toLowerCase().trim() >
      filterValue?.toString().toLowerCase().trim();

greaterThan.autoRemove = (val) => !val;

const greaterThanOrEqualTo = (row, id, filterValue) =>
  equals(row, id, filterValue) || greaterThan(row, id, filterValue);

greaterThanOrEqualTo.autoRemove = (val) => !val;

const lessThan = (row, id, filterValue) =>
  !isNaN(+filterValue) && !isNaN(+row.getValue(id))
    ? +row.getValue(id) < +filterValue
    : row.getValue(id)?.toString().toLowerCase().trim() <
      filterValue?.toString().toLowerCase().trim();

lessThan.autoRemove = (val) => !val;

const lessThanOrEqualTo = (row, id, filterValue) =>
  equals(row, id, filterValue) || lessThan(row, id, filterValue);

lessThanOrEqualTo.autoRemove = (val) => !val;

const between = (row, id, filterValues) =>
  (["", undefined].includes(filterValues[0]) ||
    greaterThan(row, id, filterValues[0])) &&
  ((!isNaN(+filterValues[0]) &&
    !isNaN(+filterValues[1]) &&
    +filterValues[0] > +filterValues[1]) ||
    ["", undefined].includes(filterValues[1]) ||
    lessThan(row, id, filterValues[1]));

between.autoRemove = (val) => !val;

const betweenInclusive = (row, id, filterValues) =>
  (["", undefined].includes(filterValues[0]) ||
    greaterThanOrEqualTo(row, id, filterValues[0])) &&
  ((!isNaN(+filterValues[0]) &&
    !isNaN(+filterValues[1]) &&
    +filterValues[0] > +filterValues[1]) ||
    ["", undefined].includes(filterValues[1]) ||
    lessThanOrEqualTo(row, id, filterValues[1]));

betweenInclusive.autoRemove = (val) => !val;

const empty = (row, id, _filterValue) => !row.getValue(id)?.toString().trim();

empty.autoRemove = (val) => !val;

const notEmpty = (row, id, _filterValue) =>
  !!row.getValue(id)?.toString().trim();

notEmpty.autoRemove = (val) => !val;

const CustomMapping = {
  between: between,
  betweenInclusive: betweenInclusive,
  contains: contains,
  empty: empty,
  endsWith: endsWith,
  equals: equals,
  fuzzy: fuzzy,
  greaterThan: greaterThan,
  greaterThanOrEqualTo: greaterThanOrEqualTo,
  lessThan: lessThan,
  lessThanOrEqualTo: lessThanOrEqualTo,
  notEmpty: notEmpty,
  notEquals: notEquals,
  startsWith: startsWith,
};

export { CustomMapping };
