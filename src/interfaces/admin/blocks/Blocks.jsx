import BlockItem from "./BlockItem";
import AddBlockForm from "./AddBlockForm";
import { useEffect, useRef, useState } from "react";
import { adminPermission, shopkeeperPermission, userPermission } from "../../../constants/permissions";
import selectOptions from "../../../constants/selectOptions";
import Loading from "../../general/Loading";
import BlockName from "./BlockName";
import getBlocks from "./functions/getBlocks";
import "./css/block.css";
import searchOptions from "../../../constants/searchOptions";
import BlockHeader from "./BlockHeader";
import HeaderButton from "../../../components/mainArea";
import compare from "../../../functions/compare";
import checkPermissions from "../../../functions/checkPermission";
import NotAllowdPage from "../../general/NotAllowedPage";

function Blocks(props) {
  const cardRef = useRef();
  const [currentEdit, setCurrentEdit] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [filter, setFilter] = useState(searchOptions.blocks);

  useEffect(() => {
    if (!currentEdit) setAddNew(true);
  }, [currentEdit]);

  const [items, setItems] = useState([]);
  useEffect(() => {
    const populateArray = async () => {
      const newArr = await Promise.all(
        Object.keys(props.blocks).map(async (block, blockIndex) => {
          const isTrue = await compare(filter, { reason: props.blocks[block].reason });
          if (isTrue) {
            return <BlockName key={blockIndex} index={blockIndex} block={props.blocks[block]} currentEdit={currentEdit} setCurrentEdit={setCurrentEdit} setAddNew={setAddNew} />;
          }
        })
      );
      setItems([...newArr]);
    };

    populateArray();
  }, [filter, props.blocks, currentEdit]);

  useEffect(() => {
    setCurrentEdit(false);
  }, [filter]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (props.blocks == -1 && checkPermissions(props.userInformation, ["admin.block.all"])) getBlocks(props.userInformation, props.setUserInformation, props.refreshStatus, props.setRefreshStatus, props.setBlocks, props.toast);
  }, []);
  useEffect(() => {
    if (props.blocks != -1) setLoading(false);
  }, [props.blocks]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      for (const card of cardRef.current.getElementsByClassName("role-card")) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      }
    };
    if (cardRef.current) {
      cardRef.current.onmousemove = handleMouseMove;
    }
  }, [cardRef.current]);

  try {
    return checkPermissions(props.userInformation, ["admin.block.all"]) ? (
      <>
        {loading ? (
          <div style={{ display: "flex", width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
            <Loading />
          </div>
        ) : (
          <>
            <div className="main-area" style={{ flex: "initial" }}>
              <HeaderButton />

              <div className="role-right-area">
                <div id="role-cards" ref={cardRef}>
                  <div
                    className="role-card"
                    style={{ "--mouse-x": " 243.38641357421875px", "--mouse-y": "32px" }}
                    onClick={() => {
                      setCurrentEdit(false);
                      setAddNew(true);
                    }}
                  >
                    <div className="role-card-content">
                      <div className="role-card-info-wrapper">
                        <div className="role-card-info">
                          <i className="fa-duotone fa-apartment"></i>
                          <div className="role-card-info-title">
                            <h3>حظر جديد</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {items.map((item) => {
                    return item;
                  })}
                </div>
              </div>
            </div>

            <div className="tasks-wrapper">
              <BlockHeader filter={filter} setFilter={setFilter} />
              {currentEdit && (
                <BlockItem
                  toast={props.toast}
                  currentEdit={currentEdit}
                  setCurrentEdit={setCurrentEdit}
                  blocks={props.blocks}
                  setBlocks={props.setBlocks}
                  permission={currentEdit.id == 1 ? shopkeeperPermission : userPermission}
                  show={currentEdit.id == 1 ? selectOptions.shopkeeperShow : selectOptions.userShow}
                  userInformation={props.userInformation}
                  setUserInformation={props.setUserInformation}
                  refreshStatus={props.refreshStatus}
                  setRefreshStatus={props.setRefreshStatus}
                />
              )}
              {addNew && <AddBlockForm toast={props.toast} blocks={props.blocks} setBlocks={props.setBlocks} permission={userPermission} show={selectOptions.userShow} setCurrentEdit={setCurrentEdit} userInformation={props.userInformation} setUserInformation={props.setUserInformation} refreshStatus={props.refreshStatus} setRefreshStatus={props.setRefreshStatus} />}
            </div>
          </>
        )}
      </>
    ) : (
      <>
        <NotAllowdPage />
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Blocks;
