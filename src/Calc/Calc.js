import React, { useEffect, useState } from "react";
import "./Calc.css";

const industryAndTask = [
  { id: 1, name: "Розница", sclad: 7, proiz: 0, trans: 8, type: "indus" },
  { id: 2, name: "FMCG", sclad: 11, proiz: 3, trans: 9, type: "indus" },
  {
    id: 3,
    name: "Логистические услуги",
    sclad: 12,
    proiz: 0,
    trans: 6,
    type: "indus",
  },
  { id: 4, name: "eCom", sclad: 10, proiz: 0, trans: 12, type: "indus" },
  {
    id: 5,
    name: "Oil&Gas&Chemicals",
    sclad: 10,
    proiz: 2,
    trans: 11,
    type: "indus",
  },
  {
    id: 6,
    name: "Стратегия",
    sclad: 100,
    proiz: 100,
    trans: 100,
    type: "task",
  },
  { id: 7, name: "Тактика", sclad: 66, proiz: 50, trans: 100, type: "task" },
];

const Calc = (props) => {
  const [summSclad, setSummSclad] = useState(0);
  const [summProiz, setSummProiz] = useState(0);
  const [summTrans, setSummTrans] = useState(0);

  const [resSclad, setResSclad] = useState(0);
  const [resProiz, setResProiz] = useState(0);
  const [resTrans, setResTrans] = useState(0);

  const [itog, setItog] = useState(0);

  const [data, setData] = useState([]);

  useEffect(() => {
    let sl,
      pl,
      tl = false;
    let s = summSclad;
    let p = summProiz;
    let t = summTrans;
    if (data.length) {
      data.forEach((el) => {
        if (el.sclad > 0) {
          sl = true;
          s = s * (el.sclad / 100);
        }
        if (el.proiz > 0) {
          pl = true;
          p = p * (el.proiz / 100);
        }
        if (el.trans > 0) {
          tl = true;
          t = t * (el.trans / 100);
        }
      });
    }
    setResSclad(sl ? s.toFixed(2) : 0);
    setResProiz(pl ? p.toFixed(2) : 0);
    setResTrans(tl ? t.toFixed(2) : 0);
  }, [summSclad, summProiz, summTrans, data.length, data]);

  useEffect(() => {
    setItog(Number(resTrans) + Number(resSclad) + Number(resProiz));
  }, [resTrans, resSclad, resProiz]);
  //
  return (
    <>
      <div className="table">
        <div className="table_head">
          <div>#</div>
          <div>Складские затраты</div>
          <div>Производственные затраты</div>
          <div>Транспортные затраты</div>
        </div>

        <div className="table_input">
          <div></div>
          <div>
            <input
              type="number"
              value={summSclad}
              onChange={(v) => {
                setSummSclad(v.currentTarget.value);
              }}
            />
          </div>
          <div>
            <input
              type="number"
              value={summProiz}
              onChange={(v) => {
                setSummProiz(v.currentTarget.value);
              }}
            />
          </div>
          <div>
            <input
              type="number"
              value={summTrans}
              onChange={(v) => {
                setSummTrans(v.currentTarget.value);
              }}
            />
          </div>
        </div>
        <div className="table_listbox">
          {data.length
            ? data.map((i) => (
                <div key={i.id} className="table_list">
                  <div style={{ textAlign: "left" }}> {i.name}</div>
                  <div> {i.sclad}%</div>
                  <div>{i.proiz}%</div>
                  <div>{i.trans}%</div>
                </div>
              ))
            : null}
        </div>

        <div className="table_list result ">
          <div></div>
          <div>{resSclad} </div>
          <div>{resProiz} </div>
          <div>{resTrans} </div>
        </div>
        <div style={{ textAlign: "right", padding: "5px  20px" }}>
          Итого {itog}{" "}
        </div>
      </div>

      <div className="indAndTask">
        <div className="indAndTask_indus">
          <h4>Индустрия</h4>
          <ul>
            {industryAndTask
              .filter((el) => el.type === "indus")
              .map((el) => (
                <li key={el.id}>
                  <label htmlFor={el.id}>
                    <input
                      id={el.id}
                      type="checkbox"
                      onChange={(a) => {
                        if (a.currentTarget.checked) {
                          setData([...data, el]);
                        }
                        if (!a.currentTarget.checked) {
                          setData(data.filter((v) => v.id !== el.id));
                        }
                      }}
                    />
                    {el.name}, ({el.sclad}%, {el.proiz}% , {el.trans}%)
                  </label>
                </li>
              ))}
          </ul>
        </div>
        <div className="indAndTask_task">
          <h4>Задача</h4>
          <ul>
            {industryAndTask
              .filter((el) => el.type === "task")
              .map((el) => (
                <li key={el.id}>
                  <label htmlFor={el.id}>
                    <input
                      id={el.id}
                      type="checkbox"
                      onChange={(a) => {
                        if (a.currentTarget.checked) {
                          setData([...data, el]);
                        }
                        if (!a.currentTarget.checked) {
                          setData(data.filter((v) => v.id !== el.id));
                        }
                      }}
                    />{" "}
                    {el.name}, ({el.sclad}%,
                    {el.proiz}% , {el.trans}%)
                  </label>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Calc;
