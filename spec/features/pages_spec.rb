require "rails_helper"

feature "a guest can navigate pages" do
  it "is the landing page to the map page to the landing page" do
    visit '/'
    
    expect(page).to have_content("Park Finder")
    
    click_link "Find a Park"
    
    expect(current_path).to eq('/maps')
    expect(page).to have_content("Near Me")
    
    click_link "Park Finder"
    
    expect(current_path).to eq('/')
  end
end