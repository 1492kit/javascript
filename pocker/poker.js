export const bestHands = (hands) => {
  const combinations = {
    royalFlush: 10,
    straightFlush: 9,
    fourOfAKind: 8,
    fullHouse: 7,
    flush: 6,
    straight: 5,
    set: 4,
    twoPair: 3,
    onePair: 2,
    highCard: 1,
  };

  if (hands.length === 1) {
    return hands;
  }

  const handCombValue = [];
  let handsInfo = [];
  for (let i = 0; i < hands.length; i += 1) {
    const hand = hands[i].split(' ');

    const handNumbers = hand.map((item) => item.slice(0, -1));

    for (let x = 0; x < handNumbers.length; x += 1) {
      if (handNumbers[x] === 'J') {
        handNumbers.splice(x, 1, 11);
      } else if (handNumbers[x] === 'Q') {
        handNumbers.splice(x, 1, 12);
      } else if (handNumbers[x] === 'K') {
        handNumbers.splice(x, 1, 13);
      } else if (handNumbers[x] === 'A') {
        handNumbers.splice(x, 1, 14);
      } else {
        handNumbers.splice(x, 1, Number(handNumbers[x]));
      }
    }

    handNumbers.sort((a, b) => a - b);

    // счетчик для завершения шага, если комбинация найдена (линтер запретил continue)
    let endStep = 0;

    // проверка на флеш
    if (hand[0].at(-1) === hand[1].at(-1) && hand[1].at(-1) === hand[2].at(-1)
      && hand[2].at(-1) === hand[3].at(-1) && hand[3].at(-1) === hand[4].at(-1)) {
      // проверка на стрит-флеш
      if (handNumbers[4] - handNumbers[0] === 4) {
        // проверка на флеш-рояль
        if (handNumbers.includes(14)) {
          handCombValue.push(combinations.royalFlush);
          handsInfo.push({
            combination: combinations.royalFlush,
            hand: hands[i],
            numbers: handNumbers,
          });
          endStep += 1;
        } else {
          handCombValue.push(combinations.straightFlush);
          handsInfo.push({
            combination: combinations.straightFlush,
            hand: hands[i],
            numbers: handNumbers,
          });
          endStep += 1;
        }
        // проверка на стрит-флеш с тузом вначале
      } else if (handNumbers.includes(14) && handNumbers[0] === 2 && handNumbers[1] === 3
        && handNumbers[2] === 4 && handNumbers[3] === 5 && endStep === 0) {
        handCombValue.push(combinations.straightFlush);
        handsInfo.push({
          combination: combinations.straightFlush,
          hand: hands[i],
          numbers: handNumbers,
        });
        endStep += 1;
      } else {
        handCombValue.push(combinations.flush);
        handsInfo.push({ combination: combinations.flush, hand: hands[i], numbers: handNumbers });
        endStep += 1;
      }
    }

    // проверка на каре
    if (handNumbers[0] === handNumbers[1] && handNumbers[1] === handNumbers[2]
      && handNumbers[2] === handNumbers[3] && endStep === 0 && endStep === 0) {
      handCombValue.push(combinations.fourOfAKind);
      handsInfo.push({
        combination: combinations.fourOfAKind,
        hand: hands[i],
        numbers: handNumbers,
        careCard: handNumbers[0],
        careOtherCard: handNumbers[4],
      });
      endStep += 1;
    } else if (handNumbers[1] === handNumbers[2] && handNumbers[2] === handNumbers[3]
      && handNumbers[3] === handNumbers[4] && endStep === 0) {
      handCombValue.push(combinations.fourOfAKind);
      handsInfo.push({
        combination: combinations.fourOfAKind,
        hand: hands[i],
        numbers: handNumbers,
        careCard: handNumbers[1],
        careOtherCard: handNumbers[0],
      });
      endStep += 1;
    }

    // проверка на фулхауз
    if (handNumbers[0] === handNumbers[1] && handNumbers[1] === handNumbers[2]
      && handNumbers[3] === handNumbers[4] && endStep === 0) {
      handCombValue.push(combinations.fullHouse);
      handsInfo.push({
        combination: combinations.fullHouse,
        hand: hands[i],
        numbers: handNumbers,
        fullSet: handNumbers[0],
        fullPair: handNumbers[3],
      });
      endStep += 1;
    } else if (handNumbers[0] === handNumbers[1] && handNumbers[2] === handNumbers[3]
      && handNumbers[3] === handNumbers[4] && endStep === 0) {
      handCombValue.push(combinations.fullHouse);
      handsInfo.push({
        combination: combinations.fullHouse,
        hand: hands[i],
        numbers: handNumbers,
        fullSet: handNumbers[2],
        fullPair: handNumbers[0],
      });
      endStep += 1;
    }

    // проверка на стрит
    if (handNumbers[0] + 1 === handNumbers[1] && handNumbers[1] + 1 === handNumbers[2]
      && handNumbers[2] + 1 === handNumbers[3] && handNumbers[3] + 1 === handNumbers[4]
      && endStep === 0) {
      handCombValue.push(combinations.straight);
      handsInfo.push({ combination: combinations.straight, hand: hands[i], numbers: handNumbers });
      endStep += 1;
      // проверка на стрит с тузом вначале
    } else if (handNumbers.includes(14) && handNumbers[0] === 2 && handNumbers[1] === 3
      && handNumbers[2] === 4 && handNumbers[3] === 5 && endStep === 0) {
      handCombValue.push(combinations.straight);
      handsInfo.push({
        combination: combinations.straight,
        hand: hands[i],
        numbers: handNumbers,
        aceOne: true,
      });
      endStep += 1;
    }

    // проверка на сет (тройка)
    if (handNumbers[0] === handNumbers[1] && handNumbers[1] === handNumbers[2] && endStep === 0) {
      handCombValue.push(combinations.set);
      handsInfo.push({
        combination: combinations.set,
        hand: hands[i],
        numbers: handNumbers,
        set: handNumbers[0],
        highCard1: handNumbers[4],
        highCard2: handNumbers[3],
      });
      endStep += 1;
    } else if (handNumbers[1] === handNumbers[2] && handNumbers[2] === handNumbers[3]
      && endStep === 0) {
      handCombValue.push(combinations.set);
      handsInfo.push({
        combination: combinations.set,
        hand: hands[i],
        numbers: handNumbers,
        set: handNumbers[1],
        highCard1: handNumbers[4],
        highCard2: handNumbers[0],
      });
      endStep += 1;
    } else if (handNumbers[2] === handNumbers[3] && handNumbers[3] === handNumbers[4]
      && endStep === 0) {
      handCombValue.push(combinations.set);
      handsInfo.push({
        combination: combinations.set,
        hand: hands[i],
        numbers: handNumbers,
        set: handNumbers[2],
        highCard1: handNumbers[1],
        highCard2: handNumbers[0],
      });
      endStep += 1;
    }

    // проверка на две пары
    if (handNumbers[0] === handNumbers[1] && handNumbers[2] === handNumbers[3] && endStep === 0) {
      handCombValue.push(combinations.twoPair);
      handsInfo.push({
        combination: combinations.twoPair,
        hand: hands[i],
        numbers: handNumbers,
        minPair: handNumbers[0],
        maxPair: handNumbers[2],
        highCard: handNumbers[4],
      });
      endStep += 1;
    } else if (handNumbers[0] === handNumbers[1] && handNumbers[3] === handNumbers[4]
      && endStep === 0) {
      handCombValue.push(combinations.twoPair);
      handsInfo.push({
        combination: combinations.twoPair,
        hand: hands[i],
        numbers: handNumbers,
        minPair: handNumbers[0],
        maxPair: handNumbers[3],
        highCard: handNumbers[2],
      });
      endStep += 1;
    } else if (handNumbers[1] === handNumbers[2] && handNumbers[3] === handNumbers[4]
      && endStep === 0) {
      handCombValue.push(combinations.twoPair);
      handsInfo.push({
        combination: combinations.twoPair,
        hand: hands[i],
        numbers: handNumbers,
        minPair: handNumbers[1],
        maxPair: handNumbers[3],
        highCard: handNumbers[0],
      });
      endStep += 1;
    }

    // проверка на пару
    if (handNumbers[0] === handNumbers[1] && endStep === 0) {
      handCombValue.push(combinations.onePair);
      handsInfo.push({
        combination: combinations.onePair,
        hand: hands[i],
        numbers: handNumbers,
        pair: handNumbers[0],
        highCard1: handNumbers[4],
        highCard2: handNumbers[3],
        highCard3: handNumbers[2],
      });
      endStep += 1;
    } else if (handNumbers[1] === handNumbers[2] && endStep === 0) {
      handCombValue.push(combinations.onePair);
      handsInfo.push({
        combination: combinations.onePair,
        hand: hands[i],
        numbers: handNumbers,
        pair: handNumbers[1],
        highCard1: handNumbers[4],
        highCard2: handNumbers[3],
        highCard3: handNumbers[0],
      });
      endStep += 1;
    } else if (handNumbers[2] === handNumbers[3] && endStep === 0) {
      handCombValue.push(combinations.onePair);
      handsInfo.push({
        combination: combinations.onePair,
        hand: hands[i],
        numbers: handNumbers,
        pair: handNumbers[2],
        highCard1: handNumbers[4],
        highCard2: handNumbers[1],
        highCard3: handNumbers[0],
      });
      endStep += 1;
    } else if (handNumbers[3] === handNumbers[4] && endStep === 0) {
      handCombValue.push(combinations.onePair);
      handsInfo.push({
        combination: combinations.onePair,
        hand: hands[i],
        numbers: handNumbers,
        pair: handNumbers[3],
        highCard1: handNumbers[2],
        highCard2: handNumbers[1],
        highCard3: handNumbers[0],
      });
      endStep += 1;
    }

    if (endStep === 0) {
      handCombValue.push(combinations.highCard);
      handsInfo.push({ combination: combinations.highCard, hand: hands[i], numbers: handNumbers });
    }
  }

  // ищем самую сильную комбинацию
  const strongComb = handCombValue.filter((item) => item === Math.max(...handCombValue));
  // и если она одна, возвращаем ее
  if (strongComb.length === 1) {
    return [hands[handCombValue.indexOf(Math.max(...handCombValue))]];
  }

  // сравниваем комбинации и определяем победителя
  const winnersHands = [];

  // флеш-рояль: ничья
  if (Math.max(...handCombValue) === 10) {
    for (let i = 0; i < handsInfo.length; i += 1) {
      if (handsInfo[i].combination === Math.max(...handCombValue)) {
        winnersHands.push(handsInfo[i].hand);
      }
    }
  }

  // стрит-флеш, стрит, флеш
  if (Math.max(...handCombValue) === 9 || Math.max(...handCombValue) === 6
    || Math.max(...handCombValue) === 5) {
    const maxCardNumbers = [];
    for (let i = 0; i < handsInfo.length; i += 1) {
      if (handsInfo[i].combination === Math.max(...handCombValue)) {
        if (handsInfo[i].aceOne) {
          maxCardNumbers.push(handsInfo[i].numbers[3]);
        } else {
          maxCardNumbers.push(Math.max(...handsInfo[i].numbers));
        }
      }
    }
    for (let i = 0; i < handsInfo.length; i += 1) {
      if (Math.max(...maxCardNumbers) === Math.max(...handsInfo[i].numbers)
        && handsInfo[i].combination === Math.max(...handCombValue)) {
        winnersHands.push(handsInfo[i].hand);
      }
    }
  }

  // каре
  if (Math.max(...handCombValue) === 8) {
    let careHands = handsInfo.filter((item) => item.careCard);
    if (careHands.length === 1) {
      winnersHands.push(careHands[0].hand);
    } else {
      let careCardMax = careHands[0].careCard;
      for (let i = 1; i < careHands.length; i += 1) {
        if (careCardMax < careHands[i].careCard) {
          careCardMax = careHands[i].careCard;
        }
      }
      careHands = careHands.filter((item) => item.careCard === careCardMax);
      if (careHands.length === 1) {
        winnersHands.push(careHands[0].hand);
      } else {
        let careOtherCardMax = careHands[0].careOtherCard;
        for (let i = 1; i < careHands.length; i += 1) {
          if (careOtherCardMax < careHands[i].careOtherCard) {
            careOtherCardMax = careHands[i].careOtherCard;
          }
        }
        careHands = careHands.filter((item) => item.careOtherCard === careOtherCardMax);
        if (careHands.length === 1) {
          winnersHands.push(careHands[0].hand);
        } else {
          for (let i = 0; i < careHands.length; i += 1) {
            winnersHands.push(careHands[i].hand);
          }
        }
      }
    }
  }

  // фулхауз
  if (Math.max(...handCombValue) === 7) {
    let fullHouseHands = handsInfo.filter((item) => item.fullSet);

    if (fullHouseHands.length === 1) {
      winnersHands.push(fullHouseHands[0].hand);
    } else {
      let fullSetMax = fullHouseHands[0].fullSet;
      for (let i = 1; i < fullHouseHands.length; i += 1) {
        if (fullSetMax < fullHouseHands[i].fullSet) {
          fullSetMax = fullHouseHands[i].fullSet;
        }
      }
      fullHouseHands = fullHouseHands.filter((item) => item.fullSet === fullSetMax);

      if (fullHouseHands.length === 1) {
        winnersHands.push(fullHouseHands[0].hand);
      } else {
        let fullPairMax = fullHouseHands[0].fullPair;
        for (let i = 1; i < fullHouseHands.length; i += 1) {
          if (fullPairMax < fullHouseHands[i].fullPair) {
            fullPairMax = fullHouseHands[i].carefullPairOtherCard;
          }
        }
        fullHouseHands = fullHouseHands.filter((item) => item.fullPair === fullPairMax);
        if (fullHouseHands.length === 1) {
          winnersHands.push(fullHouseHands[0].hand);
        } else {
          for (let i = 0; i < fullHouseHands.length; i += 1) {
            winnersHands.push(fullHouseHands[i].hand);
          }
        }
      }
    }
  }

  // тройка
  if (Math.max(...handCombValue) === 4) {
    let setHands = handsInfo.filter((item) => item.set);
    if (setHands.length === 1) {
      winnersHands.push(setHands[0].hand);
    } else {
      let setMax = setHands[0].set;
      for (let i = 1; i < setHands.length; i += 1) {
        if (setMax < setHands[i].set) {
          setMax = setHands[i].set;
        }
      }
      setHands = setHands.filter((item) => item.set === setMax);
      if (setHands.length === 1) {
        winnersHands.push(setHands[0].hand);
      } else {
        let setHighCard1Max = setHands[0].highCard1;
        for (let i = 1; i < setHands.length; i += 1) {
          if (setHighCard1Max < setHands[i].highCard1) {
            setHighCard1Max = setHands[i].highCard1;
          }
        }
        setHands = setHands.filter((item) => item.highCard1 === setHighCard1Max);

        if (setHands.length === 1) {
          winnersHands.push(setHands[0].hand);
        } else {
          let setHighCard2Max = setHands[0].highCard2;
          for (let i = 1; i < setHands.length; i += 1) {
            if (setHighCard2Max < setHands[i].highCard2) {
              setHighCard2Max = setHands[i].highCard2;
            }
          }
          setHands = setHands.filter((item) => item.highCard2 === setHighCard2Max);

          if (setHands.length === 1) {
            winnersHands.push(setHands[0].hand);
          } else {
            for (let i = 0; i < setHands.length; i += 1) {
              winnersHands.push(setHands[i].hand);
            }
          }
        }
      }
    }
  }

  // две пары
  if (Math.max(...handCombValue) === 3) {
    let twoPairHands = handsInfo.filter((item) => item.maxPair);
    if (twoPairHands.length === 1) {
      winnersHands.push(twoPairHands[0].hand);
    } else {
      let maxPairMax = twoPairHands[0].maxPair;
      for (let i = 1; i < twoPairHands.length; i += 1) {
        if (maxPairMax < twoPairHands[i].maxPair) {
          maxPairMax = twoPairHands[i].maxPair;
        }
      }
      twoPairHands = twoPairHands.filter((item) => item.maxPair === maxPairMax);
      if (twoPairHands.length === 1) {
        winnersHands.push(twoPairHands[0].hand);
      } else {
        let minPairMax = twoPairHands[0].minPair;
        for (let i = 1; i < twoPairHands.length; i += 1) {
          if (minPairMax < twoPairHands[i].minPair) {
            minPairMax = twoPairHands[i].minPair;
          }
        }
        twoPairHands = twoPairHands.filter((item) => item.minPair === minPairMax);

        if (twoPairHands.length === 1) {
          winnersHands.push(twoPairHands[0].hand);
        } else {
          let highCardMax = twoPairHands[0].highCard;
          for (let i = 1; i < twoPairHands.length; i += 1) {
            if (highCardMax < twoPairHands[i].highCard) {
              highCardMax = twoPairHands[i].highCard;
            }
          }
          twoPairHands = twoPairHands.filter((item) => item.highCard === highCardMax);

          if (twoPairHands.length === 1) {
            winnersHands.push(twoPairHands[0].hand);
          } else {
            for (let i = 0; i < twoPairHands.length; i += 1) {
              winnersHands.push(twoPairHands[i].hand);
            }
          }
        }
      }
    }
  }

  // пара
  if (Math.max(...handCombValue) === 2) {
    let pairHands = handsInfo.filter((item) => item.pair);
    if (pairHands.length === 1) {
      winnersHands.push(pairHands[0].hand);
    } else {
      let pairMax = pairHands[0].pair;
      for (let i = 1; i < pairHands.length; i += 1) {
        if (pairMax < pairHands[i].pair) {
          pairMax = pairHands[i].pair;
        }
      }
      pairHands = pairHands.filter((item) => item.pair === pairMax);
      if (pairHands.length === 1) {
        winnersHands.push(pairHands[0].hand);
      } else {
        let highCard1Max = pairHands[0].highCard1;
        for (let i = 1; i < pairHands.length; i += 1) {
          if (highCard1Max < pairHands[i].highCard1) {
            highCard1Max = pairHands[i].highCard1;
          }
        }
        pairHands = pairHands.filter((item) => item.highCard1 === highCard1Max);

        if (pairHands.length === 1) {
          winnersHands.push(pairHands[0].hand);
        } else {
          let highCard2Max = pairHands[0].highCard2;
          for (let i = 1; i < pairHands.length; i += 1) {
            if (highCard2Max < pairHands[i].highCard2) {
              highCard2Max = pairHands[i].highCard2;
            }
          }
          pairHands = pairHands.filter((item) => item.highCard2 === highCard2Max);

          if (pairHands.length === 1) {
            winnersHands.push(pairHands[0].hand);
          } else {
            let highCard3Max = pairHands[0].highCard3;
            for (let i = 1; i < pairHands.length; i += 1) {
              if (highCard3Max < pairHands[i].highCard3) {
                highCard3Max = pairHands[i].highCard3;
              }
            }
            pairHands = pairHands.filter((item) => item.highCard3 === highCard3Max);

            if (pairHands.length === 1) {
              winnersHands.push(pairHands[0].hand);
            } else {
              for (let i = 0; i < pairHands.length; i += 1) {
                winnersHands.push(pairHands[i].hand);
              }
            }
          }
        }
      }
    }
  }

  // старшая карта
  if (Math.max(...handCombValue) === 1) {
    for (let z = 4; z >= 0; z -= 1) {
      let highCard = handsInfo[0].numbers[z];
      for (let i = 1; i < handsInfo.length; i += 1) {
        if (highCard < handsInfo[i].numbers[z]) {
          highCard = handsInfo[i].numbers[z];
        }
      }
      handsInfo = handsInfo.filter((item) => item.numbers[z] === highCard);
      if (handsInfo.length === 1) {
        winnersHands.push(handsInfo[0].hand);
        return winnersHands;
      }
    }

    const { numbers: [, , , , initialHighCard] } = handsInfo[0];
    let highCard = initialHighCard;
    for (let i = 1; i < handsInfo.length; i += 1) {
      const { numbers: [, , , , currentCard] } = handsInfo[i];
      if (highCard < currentCard) {
        highCard = currentCard;
      }
    }
    handsInfo = handsInfo.filter((item) => item.numbers[4] === highCard);
    for (let i = 0; i < handsInfo.length; i += 1) {
      winnersHands.push(handsInfo[i].hand);
    }
  }
  return winnersHands;
};
