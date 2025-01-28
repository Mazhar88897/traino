import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  CustomButton,
  DeleteModal,
  DocumentPreview,
  Loader,
  NoRecordFound,
  PreviewCards,
  UploadDocumentModal,
} from "../../../components";
import { handleError } from "../../../hooks/globalFunction";
import {
  addDocuments,
  deleteDocuments,
  getDocuments,
  getDocumentsById,
} from "../../../services/myLearnings";
import { selectdrawer } from "../../../store/slice/drawer";
import {
  addDocument,
  deleteDocumentAction,
  selectUser,
  updateDocumentList,
  updateUserData,
} from "../../../store/slice/user";
import {
  addSummaryAction,
  addKeyPointsAction,
  selectedDocumentAction,
  addQuizAction,
} from "../../../store/slice/summaryAndKeyPoints";
import { IMAGES } from "../../../theme";
import CompanyWrapper from "../../companies/summary/CompanyWrapper";
import { Style } from "../style";
import CustomTabs from "../../../components/CustomTabs";
import DepartmentFormControl from "../../../components/CustomFormControl/departmentFormControl";
import UploadDocumentContent from "../../../components/Modals/UploadDocument/uploadDocumentContent";
import { FileUploader } from "react-drag-drop-files";
import CloseIcon from "@mui/icons-material/Close";
import AssignDocumentModal from "../../../components/Modals/AssignDocumentModal";
import useWindowDimensions from "../../../hooks/windowDimensions";

const TrainingDocuments = () => {
  const { width } = useWindowDimensions();
  const state = useLocation()?.state;
  const data = state?.data || {};
  console.log("han jee", state, data);
  const {
    access,
    documents,
    departments,
    isSuperAdmin,
    isAdmin,
    company_id,
    isUser,
    member_id,
  } = useSelector(selectUser);

  const navigate = useNavigate();

  const [overview, setOverview] = useState("");
  const [avgCompletionTime, setAvgCompletionTime] = useState();
  const [dueDate, setDueDate] = useState();

  const { id, departId } = useParams();
  const [subdivision, setsubdivision] = useState("All Trainings");
  const handleSubDivision = (id) => {
    setPresentTab(id);
    switch (id) {
      case 2:
        setsubdivision("In progress");
        return;
      case 3:
        setsubdivision("Completed");
        return;
      default:
        setsubdivision("All Trainings");
        return;
    }
  };

  const headingData = isSuperAdmin
    ? [
        {
          name: `Companies >`,
          handleNavigate: () => navigate(`/trainings`),
        },
        {
          name: `${data?.name} >`,
          handleNavigate: () =>
            navigate(`/company/${id}`, { state: { ...state } }),
        },
        { name: `All Trainings` },
      ]
    : isAdmin
    ? [
        {
          name: `Dashboard >`,
          handleNavigate: () => navigate(`/dashboard`),
        },
        { name: `Trainings >` },
        { name: "Create Training" },
      ]
    : [
        {
          name: "My Trainings >",
        },

        { name: subdivision },
      ];

  const { drawer } = useSelector(selectdrawer);
  const [loading, setLoading] = useState(false);
  const [getLoading, setGetLoading] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [previewData, setPreviewData] = useState(false);
  const [presentTab, setPresentTab] = useState(1);
  const [selectedDepart, setSelectedDepart] = useState("all");
  const [documentsData, setDocumentsData] = useState({ ...documents });
  const [fileName, setFileName] = useState("");
  const [inputName, setInputName] = useState("");
  const [files, setFile] = useState(null);
  const isFile = files || editItem?.file;
  const [assignedDepartments, setAssignedDepartments] = useState([]);
  const divRef = useRef(null);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const height = entry.contentRect.height;
      if (height > 70) {
        setCheck(true);
      } else setCheck(false);
    });

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => observer.disconnect(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    let tempData =
      !!departments?.results?.length &&
      (departments?.id === id || !isSuperAdmin)
        ? departments?.results[0]?.id
        : false;
    if (departments?.id === id || !isSuperAdmin) {
      setSelectedDepart(tempData);
    }
    setGetLoading(true);
    setDocumentsData({});
  }, [departments?.id]);

  const openDrawer = (val, index) => {
    setOpen(val);
    setEditItem({
      file: documentsData?.results[index],
      assigned_users: val?.assigned_users,
      index: index,
      ...data,
    });
  };

  const openAssignModal = (val, index) => {
    setEditItem({
      file: documentsData?.results[index],
      assigned_users: val?.assigned_users,
      index: index,
      ...data,
    });
    setOpenAssign(val);
  };

  const onClose = () => {
    setOpenDeleteModal(false);
  };

  const dispatch = useDispatch();

  const documentOnScroll = async () => {
    let page = documents?.next?.split("/api/")?.[1];
    try {
      if (!!page) {
        const res = await getDocuments(
          dispatch,
          navigate,
          access,
          isSuperAdmin && id,
          page
        );
        dispatch(updateDocumentList(res?.data));
      } else setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const deleteDocument = async () => {
    try {
      setLoading(true);
      await deleteDocuments(dispatch, navigate, openDeleteModal, access);
      toast.success("Document deleted successfully");
      dispatch(deleteDocumentAction(openDeleteModal));
      setDocumentsData((prev) => {
        return {
          ...prev,
          results: prev?.results?.filter((item) => item?.id != openDeleteModal),
        };
      });
      setLoading(false);
      setOpenDeleteModal(false);
    } catch (err) {
      toast.error(
        handleError({ department_id: openDeleteModal }, err?.response?.data)
      );
      setLoading(false);
    }
  };
  const documentGet = async (isUpdated) => {
    if (
      !documentsData?.id ||
      selectedDepart !== documentsData?.id ||
      isUpdated
    ) {
      setGetLoading(true);
      const res = isUser
        ? await getDocumentsById(
            dispatch,
            navigate,
            access,
            member_id,
            selectedDepart
          )
        : await getDocuments(dispatch, navigate, access, selectedDepart);
      let doc = res?.data;
      doc.id = selectedDepart;
      dispatch(updateUserData({ documents: doc }));
      setDocumentsData(doc);
      setGetLoading(false);
    }
  };
  useEffect(() => {
    if (
      selectedDepart != "all" &&
      !!selectedDepart &&
      departments?.results?.length
    ) {
      setDocumentsData({});
      documentGet();
    } else {
      dispatch(updateUserData({ documents: {} }));
      setDocumentsData({});
      if (departments?.id === id || !isSuperAdmin) setGetLoading(false);
    }
  }, [selectedDepart]);

  useEffect(() => {
    dispatch(addSummaryAction({}));
    dispatch(addKeyPointsAction({}));
    dispatch(addQuizAction({}));
  }, []);
  const tabs = [
    { name: "All Trainings", id: 1 },
    { name: "In Progress", id: 2 },
    { name: "Completed", id: 3 },
  ];

  const handleChange = (file) => {
    if (!editItem?.file) {
      setFileName(file?.name?.split(".pdf")[0]);
      setInputName(file?.name?.split(".pdf")[0]);
      setFile(file);
    }
  };

  const submit = async () => {
    alert("hello");
    const payload = new FormData();
    payload.append("overview", overview);
    payload.append("avgCompletionTime", avgCompletionTime);
    payload.append("dueDate", dueDate);

    if (files) {
      payload.append("file", files);
      !!assignedDepartments?.length &&
        assignedDepartments?.map((val, index) => {
          payload.append(`department_ids[${index}]`, val?.id);
        });
      payload.append(
        "name",
        `${fileName != files?.name ? fileName : files?.name}.pdf`
      );
    }
    try {
      const { data } = await addDocuments(dispatch, navigate, payload, access);
      toast.success(
        `Document successfully ${!editItem ? "uploaded" : "updated"}`
      );
      let tempData = {
        file: files,
        name: fileName != files?.name ? fileName : files?.name,
        id: data?.created_documents[0],
        overview: overview,
        dueDate: dueDate,
        avgCompletionTime: avgCompletionTime,
      };
      dispatch(addDocument(tempData));
      documentGet(true);
      setOpen(false);
    } catch (err) {
      toast.error(handleError({}, err?.response?.data));
    }
  };

  const defaultImageUrl = useMemo(() => {
    return IMAGES.companyLogo2;
  }, []);

  return (
    <CompanyWrapper
      headingData={headingData}
      topBannerIcon={IMAGES.training}
      topBannerHeading={!isAdmin && "All Trainings"}
      buttonSx={{ width: "full" }}
      topBannerContent={
        !isAdmin && (
          <Box
            sx={{
              display: "flex",

              alignItems: "center",
              gap: 2,
            }}
          >
            {isSuperAdmin && (
              <Box
                sx={{
                  width: { xs: "68px", xl: "80px" },
                  height: { xs: "84px", xl: "100px" },
                  mt: "-18px",
                  mb: -2.5,
                  zIndex: 1,
                  objectFit: "contain",
                }}
                component={"img"}
                src={state?.data?.logo || defaultImageUrl}
              />
            )}
            <DepartmentFormControl
              value={selectedDepart}
              setValue={setSelectedDepart}
            />
          </Box>
        )
      }
      handleBack={() =>
        isSuperAdmin
          ? navigate(`/trainings/company/${id}`, {
              state: { data: state?.departData },
            })
          : isAdmin
          ? navigate(`/trainings/`)
          : navigate(`/my-learning/`)
      }
      buttonClickHandling={() => setOpen(true)}
      hideHeader={open && !editItem}
    >
      <>
        {isUser && (
          <Box sx={Style.tabContainer}>
            <CustomTabs
              tabs={tabs}
              presentTab={presentTab}
              setPresentTab={handleSubDivision}
            />
            <Typography sx={Style.totalNo}>{`${
              !!documentsData?.results?.length >= 9 ? "0" : ""
            }${documentsData?.results?.length || "0"}`}</Typography>
          </Box>
        )}
        {isAdmin && ((!!editItem && open) || !open) && (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: {
                xs: "row",
                sm: check ? "column" : "row",
                md: "row",
              },
              // background: "black",
              justifyContent: check ? "center" : "space-between",
              alignItems: check ? "center" : "end",
              minHeight: "50px",
              // flexWrap: "wrap",
              // gap: "5px",
              mt: 2,
            }}
            ref={divRef}
          >
            <Typography sx={Style.allTrainingHeading}>{`All Trainings (${
              documentsData?.results?.length || 0
            })`}</Typography>
            <DepartmentFormControl
              value={selectedDepart}
              setValue={setSelectedDepart}
            />
          </Box>
        )}
        {getLoading ? (
          <Loader style={Style.loader} isCircular={true} />
        ) : !documentsData?.results?.length && !open ? (
          <NoRecordFound
            heading={"No Trainings found"}
            text={"Start building your customized trainings now"}
            img={IMAGES.notFound}
            mainSx={Style.noRecordMain}
            imgSx={Style.noRecordImg}
            headingSx={Style.noRecordHeading}
            textSx={Style.noRecordText}
          />
        ) : open && !editItem ? (
          <Box sx={Style.createTrainingMain}>
            <CloseIcon
              sx={Style.mainCloseIcon}
              onClick={() => setOpen(false)}
            />
            <UploadDocumentContent
              isPage={true}
              assignedDepartments={assignedDepartments}
              setAssignedDepartments={setAssignedDepartments}
              isNew={true}
              tempFileName={fileName}
              setTempFileName={setFileName}
              setDueDate={setDueDate}
              setOverview={setOverview}
              setAvgCompletionTime={setAvgCompletionTime}
              overview={overview}
              avgCompletionTime={avgCompletionTime}
              dueDate={dueDate}
            />
            <Box sx={Style.uploadRightSide}>
              <Box sx={Style.dashedBox}>
                <FileUploader
                  style={{ width: "100% !important" }}
                  handleChange={handleChange}
                  name="file"
                  types={["PDF"]}
                  label="Upload or drop a file right here"
                  hoverTitle="Drop document here!"
                  required={true}
                  disabled={!!editItem?.file}
                >
                  <Box sx={Style.uploadSectionContainer(!!editItem?.file)}>
                    <Box
                      sx={Style.uploadImage}
                      component={"img"}
                      src={IMAGES.uploadIcon}
                      alt="Upload Document"
                    />
                    <Typography sx={Style.text}>
                      {"Drag & drop files or "}
                      <Box component={"span"} sx={Style.browseText}>
                        {"Browse"}
                      </Box>
                    </Typography>
                    <Typography sx={Style.subText}>
                      Supported formats: PDF, PSD, AI, Word, PPT
                    </Typography>
                  </Box>
                </FileUploader>
                {isFile && (
                  <Typography sx={Style.fileName}>
                    {files?.name}
                    <CloseIcon
                      sx={Style.closeIcon}
                      onClick={() => setFile(false)}
                    />
                  </Typography>
                )}
              </Box>
              {isFile && (
                <CustomButton
                  sx={Style.uploadButton}
                  buttonText={"Upload"}
                  onClick={submit}
                />
              )}
            </Box>
          </Box>
        ) : (
          <Box sx={Style.mainContainer(documentsData)}>
            <InfiniteScroll
              dataLength={!!documentsData && documentsData?.results?.length}
              next={documentOnScroll}
              hasMore={!!documentsData?.next}
              loader={
                <Box sx={Style.progressContainer}>
                  <CircularProgress size={50} color="secondary" />
                </Box>
              }
              style={Style.documentsMain}
            >
              <Box
                sx={Style.cardWrapper(
                  drawer,
                  documents?.count === 1 && isAdmin,
                  width
                )}
              >
                {documentsData?.results?.map((val, index) => (
                  <>
                    {/* <button onClick={() => console.log(documentsData)}>
                      click
                    </button> */}
                    <PreviewCards
                      isProgressBar={presentTab === 2}
                      isCompleted={presentTab === 3}
                      key={index}
                      data={val}
                      handleClick={(event) => {
                        if (!!isUser) {
                          setOpenPreview(true);
                          setPreviewData(val);
                        } else {
                          dispatch(selectedDocumentAction(val));
                          navigate(
                            isSuperAdmin
                              ? `/trainings/company/${id}/document/${val?.id}/summary`
                              : isAdmin
                              ? `/trainings/document/${val?.id}/summary`
                              : `/my-learning/document/${val?.id}/summary`,
                            {
                              state: {
                                data: data,
                                val: val,
                                departData: state?.departData,
                              },
                            }
                          );
                        }
                      }}
                      isDownload={true}
                      isDelete={isAdmin}
                      isEdit={isAdmin}
                      deleteIconClick={() => setOpenDeleteModal(val?.id)}
                      editIconClick={() => openDrawer(val, index)}
                      assignClickHandling={() => openAssignModal(val, index)}
                    />
                  </>
                ))}
                {isAdmin && documents?.count == 1 && (
                  <Box
                    sx={{
                      width: { xs: "240px", sm: "260px" },
                      height: { xs: "185px", sm: "200px" },
                      display: "flex",
                      mr: "-18px",
                      ml: "auto",
                      mt: { xs: "10px", md: 0 },
                    }}
                    component={"img"}
                    src={IMAGES.firstTrainingCard}
                  />
                )}
              </Box>
            </InfiniteScroll>
          </Box>
        )}
        <DocumentPreview
          open={openPreview}
          setOpen={setOpenPreview}
          data={previewData}
        />
        <AssignDocumentModal
          open={openAssign}
          setOpen={setOpenAssign}
          selectedDepartment={{ ...data }}
          editItem={editItem}
          setEditItem={setEditItem}
          documentsData={documentsData}
          setDocumentsData={setDocumentsData}
        />
        <UploadDocumentModal
          open={open && !!editItem}
          setOpen={setOpen}
          selectedDepartment={{ ...data }}
          editItem={editItem}
          setEditItem={setEditItem}
        />
        <DeleteModal
          onConfirm={deleteDocument}
          onClose={onClose}
          open={!!openDeleteModal}
          setOpen={setOpenDeleteModal}
          loading={loading}
          component={"document"}
        />
      </>
    </CompanyWrapper>
  );
};
export default TrainingDocuments;
