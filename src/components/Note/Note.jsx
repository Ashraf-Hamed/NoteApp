import { useContext } from "react";
import { ShowUpdateModel, deleteNotes, showDeleteModel } from "../../utils/Note";
import style from "./Note.module.css";
import { UserContext } from "../../Context/UserContext";
import { NoteContext } from "../../Context/NoteContext";

export default function Note({ noteObj }) {
  let { token } = useContext(UserContext);
  let { setNotes } = useContext(NoteContext);
  return (
    <>
      <div className={`${style.note} note shadow `}>
        <div className="note-body">
          <h2 className="h6 fw-semibold m-0 font-Montserrat ">
            {noteObj.title}
          </h2>
          <p className={`mb-0 mt-2`}>{noteObj.content}</p>
        </div>

        <div className="note-footer">
          <i
            className="fa-solid fa-pen-to-square pointer me-2"
            onClick={() =>
              ShowUpdateModel({ id: noteObj._id, token, updater: setNotes , prevTitle:noteObj.title , prevContent:noteObj.content  })
            }
          ></i>

          <i
            onClick={() =>
              showDeleteModel({ id: noteObj._id, token, updater: setNotes })
            }
            className="bi bi-archive-fill pointer"
          ></i>
        </div>
      </div>
    </>
  );
}
