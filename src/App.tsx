import './App.css';

import { useRef, useState } from 'react';

interface WordCount {
  word: String;
  count: number;
}

type SortOrder = 'asc' | 'desc' | undefined;

interface SortBy {
  word?: SortOrder;
  count?: SortOrder;
}

function App() {
  const [wordCount, setWordCount] = useState<WordCount[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>({});

  const inputField = useRef<HTMLInputElement>(null);

  const countWords = () => {
    if (inputField.current) {
      const pattern = /\w+/g;
      const matchedWords = inputField.current.value.match(pattern) || [];

      const counts: WordCount[] = matchedWords.reduce((acc: WordCount[], word: string) => {
        let found = acc.find((wc) => wc.word === word);

        if (!!found) {
          found.count += 1;
        } else {
          acc.push({ word, count: 1 });
        }

        return acc;
      }, []);

      setWordCount(counts);
      setSortBy({});
    }
  };

  const onSortBy = (by: keyof WordCount) => {
    setSortBy((prev) => ({ [by]: prev[by] === 'asc' ? 'desc' : 'asc' }));

    setWordCount((prev) =>
      prev.sort((a, b) => (sortBy[by] === 'asc' ? (a[by] < b[by] ? 1 : -1) : a[by] > b[by] ? 1 : -1))
    );
  };

  return (
    <>
      <input ref={inputField} />
      <button onClick={countWords}>COUNT</button>
      <table>
        <tbody>
          <tr className="Header">
            <td>
              Word
              <button className="SortBtn" onClick={() => onSortBy('word')}>
                {sortBy.word ? sortBy.word === 'asc' ? <span>&darr;</span> : <span>&uarr;</span> : <span>&minus;</span>}
              </button>
            </td>
            <td>
              Count
              <button className="SortBtn" onClick={() => onSortBy('count')}>
                {sortBy.count ? (
                  sortBy.count === 'asc' ? (
                    <span>&darr;</span>
                  ) : (
                    <span>&uarr;</span>
                  )
                ) : (
                  <span>&minus;</span>
                )}
              </button>
            </td>
          </tr>
          {wordCount.map((wc) => (
            <tr>
              <td>{wc.word}</td>
              <td>{wc.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
