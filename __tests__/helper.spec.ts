import { expect, test } from 'vitest'
import { mergeAnchor, sortAnchors } from '../src/helper'

test('sortAnchor func', () => {
  expect(sortAnchors([[0], [0]], [0, 0])).toEqual([
    [[0], [0]],
    [0, 0],
  ])
  expect(sortAnchors([[1], [1, 2]], [1, 2])).toEqual([
    [[1, 2], [1]],
    [2, 1],
  ])
  expect(
    sortAnchors(
      [
        [0, 0, 0],
        [0, 0, 1],
      ],
      [1, 2],
    ),
  ).toEqual([
    [
      [0, 0, 1],
      [0, 0, 0],
    ],
    [2, 1],
  ])
  expect(
    sortAnchors(
      [
        [0, 0, 1, 0],
        [0, 1, 0, 1],
      ],
      [2, 3],
    ),
  ).toEqual([
    [
      [0, 1, 0, 1],
      [0, 0, 1, 0],
    ],
    [3, 2],
  ])
  expect(
    sortAnchors(
      [
        [0, 0],
        [0, 0, 1],
      ],
      [3, 4],
    ),
  ).toEqual([
    [
      [0, 0, 1],
      [0, 0],
    ],
    [4, 3],
  ])
  expect(
    sortAnchors(
      [
        [0, 1],
        [0, 1, 2],
      ],
      [1, 2],
    ),
  ).toEqual([
    [
      [0, 1, 2],
      [0, 1],
    ],
    [2, 1],
  ])
  expect(sortAnchors([[0, 1, 1], [0]], [4, 5])).toEqual([
    [[0, 1, 1], [0]],
    [4, 5],
  ])
  expect(
    sortAnchors(
      [
        [0, 1, 2],
        [0, 2],
      ],
      [0, 4],
    ),
  ).toEqual([
    [
      [0, 2],
      [0, 1, 2],
    ],
    [4, 0],
  ])
  expect(
    sortAnchors(
      [
        [0, 1, 2],
        [0, 2],
        [0, 0, 0, 4],
      ],
      [0, 4, 8],
    ),
  ).toEqual([
    [
      [0, 2],
      [0, 1, 2],
      [0, 0, 0, 4],
    ],
    [4, 0, 8],
  ])
})

test('mergeAnchor func', () => {
  expect(
    mergeAnchor(
      [
        [1, 2],
        [3, 4],
      ],
      [5, 2],
    ),
  ).toEqual([
    [1, 2],
    [3, 4],
    [5, 2],
  ])

  expect(mergeAnchor([[1, 2]], [5, 2])).toEqual([
    [1, 2],
    [5, 2],
  ])

  expect(mergeAnchor([[1, 2]], [1, 2])).toEqual([[1, 2]])

  expect(mergeAnchor([[1, 2, 4]], [1, 2])).toEqual([[1, 2]])

  expect(
    mergeAnchor(
      [
        [1, 2, 4],
        [3, 4, 5],
      ],
      [1, 2],
    ),
  ).toEqual([
    [1, 2],
    [3, 4, 5],
  ])

  expect(mergeAnchor([[1, 2, 3, 4, 5]], [3, 4, 5])).toEqual([
    [1, 2, 3, 4, 5],
    [3, 4, 5],
  ])

  expect(
    mergeAnchor(
      [
        [1, 2, 3, 4, 5],
        [1, 2, 3, 6, 5],
      ],
      [1, 2, 3],
    ),
  ).toEqual([[1, 2, 3]])
})
