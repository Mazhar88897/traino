<Layout>
  <TopBanner
    Icon={IMAGES.training}
    text={"Trainings"}
    currentComponent={currComponent}
  />
  <Box sx={globalStyle.HeroBanner}>
    <Box
      display={"flex"}
      component={"div"}
      onClick={() => {
        activeComponent?.onBack();
        setIsDisable(true);
      }}
    >
      <ArrowBackIcon sx={globalStyle.arrowback} />
    </Box>
    {activeComponent?.heading ? (
      <Typography sx={globalStyle.headings}>
        {activeComponent?.heading}
      </Typography>
    ) : (
      <Box sx={globalStyle.tabsContainer}>
        {tabs.map((val, index) => {
          return (
            <CustomButton
              key={index}
              sx={globalStyle.tabs(val.tabName, tab)}
              typSx={globalStyle.tabsTyp}
              buttonText={val.tabName}
              onClick={val.func}
            />
          );
        })}
      </Box>
    )}
  </Box>
  <Divider sx={globalStyle.divider} />
  <Box sx={globalStyle.wrapper}>
    <Box sx={Style.header(activeComponent)}>
      {!!activeComponent?.subHeading && (
        <FormControl variant="standard">
          <Input
            sx={Style.subHeading}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={isDisable}
            endAdornment={
              <InputAdornment position="end">
                {isDisable ? (
                  <IconButton onClick={handleEdit}>
                    <EditIcon />
                  </IconButton>
                ) : loader ? (
                  <CircularProgress size={24} />
                ) : (
                  <>
                    <IconButton onClick={handleCancel}>
                      <CloseIcon />
                    </IconButton>
                    <IconButton onClick={updateDepartmentName}>
                      <DoneIcon />
                    </IconButton>
                  </>
                )}
              </InputAdornment>
            }
          />
        </FormControl>
      )}
      <Box sx={Style.trainingDepartmentNav(activeComponent)}>
        {activeComponent?.isDepartment && (
          <SortingDropdown
            Style={Style}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            sortOpen={sortOpen}
            setSortOpen={setSortOpen}
            sortFunc={sortDepartmentFunc}
            sort={sort}
            setSort={setSort}
          />
        )}
        {activeComponent?.btnText && (
          <CustomButton
            sx={Style.btn}
            buttonText={activeComponent?.btnText}
            onClick={activeComponent?.btnClick}
          />
        )}
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "-60px",
          display: activeComponent?.isDocument ? "flex" : "none",
        }}
      >
        <SortingDropdown
          Style={Style}
          anchorEl={anchorEl2}
          setAnchorEl={setAnchorEl2}
          sortOpen={sortOpen2}
          setSortOpen={setSortOpen2}
          sortFunc={sortDocumentFunc}
          sort={sort2}
          setSort={setSort2}
        />
      </Box>
    </Box>

    <Box sx={globalStyle.cardsWrapper(drawer)}>
      <CompanyCard
        isEditeable={false}
        sx={{ flexDirection: "column-reverse", alignItems: "center" }}
        onClick={() => setCurrComponent("departments")}
      />
    </Box>
  </Box>
</Layout>;
