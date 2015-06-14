class MapsController < ApplicationController
  respond_to :json
  
  def index

  end
  
  def park_finder
    require 'pry'; binding.pry
  end
  
end
