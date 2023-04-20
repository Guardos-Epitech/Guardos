export const NavigateTo = async (destination: string, navigate: any, data?: any) => {
  navigate(destination, { state: data ? data : {} });
};
