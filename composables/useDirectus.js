export const useDirectus = () => {
  const getPosts = async (params = {}) => {
    try {
      const posts = await $fetch('/api/blog', {
        query: params
      });
      return posts;
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  };

  const getPost = async (id) => {
    try {
      const post = await $fetch(`/api/blog/${id}`);
      return post;
    } catch (error) {
      console.error('Error fetching post:', error);
      return null;
    }
  };

  const getPostBySlug = async (slug) => {
    try {
      const post = await $fetch(`/api/blog/${slug}`);
      return post;
    } catch (error) {
      console.error('Error fetching post by slug:', error);
      return null;
    }
  };

  const getTeamMembers = async (params = {}) => {
    try {
      const members = await $fetch('/api/team', {
        query: params
      });
      return members;
    } catch (error) {
      console.error('Error fetching team members:', error);
      return [];
    }
  };

  const getFeaturedMember = async () => {
    try {
      const members = await $fetch('/api/team', {
        query: {
          'filter[featured][_eq]': 'true',
          'limit': '1'
        }
      });
      return members[0] || null;
    } catch (error) {
      console.error('Error fetching featured member:', error);
      return null;
    }
  };

  const getServices = async (params = {}) => {
    try {
      const services = await $fetch('/api/services', {
        query: params
      });
      return services;
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  };

  const getServiceBySlug = async (slug) => {
    try {
      const service = await $fetch(`/api/services/${slug}`);
      return service;
    } catch (error) {
      console.error('Error fetching service by slug:', error);
      return null;
    }
  };

  const getCaminoVitalModules = async () => {
    try {
      const modules = await $fetch('/api/camino-vital-modules');
      return modules;
    } catch (error) {
      console.error('Error fetching Camino Vital modules:', error);
      return [];
    }
  };

  const getContactOptions = async () => {
    try {
      const options = await $fetch('/api/contact-options');
      return options;
    } catch (error) {
      console.error('Error fetching contact options:', error);
      return [];
    }
  };

  const getTestimonials = async (params = {}) => {
    try {
      const testimonials = await $fetch('/api/testimonials', {
        query: params
      });
      return testimonials;
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
  };

  const getOnboardingTest = async () => {
    try {
      const test = await $fetch('/api/onboarding-test');
      return test;
    } catch (error) {
      console.error('Error fetching onboarding test:', error);
      return null;
    }
  };

  return {
    getPosts,
    getPost,
    getPostBySlug,
    getTeamMembers,
    getFeaturedMember,
    getServices,
    getServiceBySlug,
    getCaminoVitalModules,
    getContactOptions,
    getTestimonials,
    getOnboardingTest
  };
};
