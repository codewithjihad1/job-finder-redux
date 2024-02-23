import { getJobs, addJob, editJob, deleteJob, getJobsType } from "./jobsApi";
const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

// initialState
const initialState = {
  jobs: [],
  isLoading: false,
  isError: false,
  error: "",
  editing: {},
  jobsFilter: [],
};

// create thunk function
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  const response = await getJobs();
  return response;
});

export const createJob = createAsyncThunk("jobs/createJob", async (data) => {
  const response = await addJob(data);
  return response;
});

export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async ({ id, data }) => {
    const response = await editJob(id, data);
    return response;
  }
);

export const removeJob = createAsyncThunk("jobs/removeJob", async (id) => {
  const response = await deleteJob(id);
  return response;
});

export const filterJobs = createAsyncThunk(
  "jobs/filterJobs",
  async (filterByType) => {
    const res = await getJobsType(filterByType);
    return res;
  }
);

// create slice
const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    editingMode: (state, action) => {
      state.editing = action.payload;
    },
    clearEditing: (state) => {
      state.editing = {};
    },
    filterBySearch: (state, action) => {
      state.jobsFilter = state.jobs.filter((job) => {
        let jobTitle = job.title.toLowerCase();
        return jobTitle.includes(action.payload.toLowerCase());
      });
    },
    sortBySalary: (state, action) => {
      state.jobsFilter = state.jobsFilter.sort((a, b) => {
        if (action.payload === "low-high") {
          return a.salary - b.salary;
        } else if (action.payload === "high-low") {
          return b.salary - a.salary;
        }
        return a.id - b.id;
      });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.jobs = action.payload;
        state.jobsFilter = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error?.message;
      })

      // add new jobs
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.jobs = action.payload;
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error?.message;
      })

      // Edit job
      .addCase(updateJob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        const indexToUpdate = state.jobs.findIndex(
          (job) => job.id === action.payload.id
        );
        state.jobs[indexToUpdate] = action.payload;
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error?.message;
      })

      // remove job
      .addCase(removeJob.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(removeJob.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.jobs = state.jobs.filter((job) => job.id !== action.meta.arg);
      })
      .addCase(removeJob.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error?.message;
      })

      // filter by jobs type
      .addCase(filterJobs.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(filterJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.jobs = action.payload;
        state.jobsFilter = action.payload;
      })
      .addCase(filterJobs.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.error = action.error?.message;
      });
  },
});

export default jobsSlice.reducer;
export const { editingMode, filterBySearch, sortBySalary, clearEditing } =
  jobsSlice.actions;
